import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledContainer = styled(Container)`
  padding: 20px;
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
  margin-bottom: 20px;
  background-color: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

const OrcamentosPage = () => {
  const { isDarkMode } = useTheme();
  const [orcamentos, setOrcamentos] = useState([]);
  const [novoOrcamento, setNovoOrcamento] = useState({ categoria: '', valorPlanejado: '', valorGasto: '0' });

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orcamentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrcamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
    }
  };

  const handleNovoOrcamentoChange = (e) => {
    setNovoOrcamento({ ...novoOrcamento, [e.target.name]: e.target.value });
  };

  const adicionarOrcamento = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/orcamentos', novoOrcamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNovoOrcamento({ categoria: '', valorPlanejado: '', valorGasto: '0' });
      fetchOrcamentos();
    } catch (error) {
      console.error('Erro ao adicionar orçamento:', error);
    }
  };

  const deletarOrcamento = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/orcamentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrcamentos();
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
    }
  };

  const calcularProgresso = (valorGasto, valorPlanejado) => {
    return Math.min((valorGasto / valorPlanejado) * 100, 100);
  };

  const dadosGrafico = {
    labels: orcamentos.map(o => o.categoria),
    datasets: [
      {
        data: orcamentos.map(o => o.valorPlanejado),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      }
    }
  };

  return (
    <Layout>
      <StyledContainer>
        <Row className="mb-4">
          <Col>
            <h2>Orçamentos</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Novo Orçamento</Card.Title>
                <Form onSubmit={adicionarOrcamento}>
                  <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="categoria"
                      value={novoOrcamento.categoria}
                      onChange={handleNovoOrcamentoChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Valor Planejado</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="valorPlanejado"
                      value={novoOrcamento.valorPlanejado}
                      onChange={handleNovoOrcamentoChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Orçamento
                  </Button>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={6}>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Distribuição do Orçamento</Card.Title>
                <ChartContainer>
                  <Pie data={dadosGrafico} options={opcoesGrafico} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          {orcamentos.map((orcamento) => (
            <Col key={orcamento.id} lg={4} md={6} className="mb-4">
              <StyledCard isDarkMode={isDarkMode}>
                <Card.Body>
                  <Card.Title>{orcamento.categoria}</Card.Title>
                  <Card.Text>
                    Planejado: R$ {parseFloat(orcamento.valorPlanejado).toFixed(2)}
                    <br />
                    Gasto: R$ {parseFloat(orcamento.valorGasto).toFixed(2)}
                  </Card.Text>
                  <ProgressBar 
                    now={calcularProgresso(orcamento.valorGasto, orcamento.valorPlanejado)} 
                    label={`${calcularProgresso(orcamento.valorGasto, orcamento.valorPlanejado).toFixed(0)}%`}
                    variant={calcularProgresso(orcamento.valorGasto, orcamento.valorPlanejado) > 100 ? "danger" : "success"}
                    className="mb-3"
                  />
                  <Button variant="outline-primary" size="sm" className="mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => deletarOrcamento(orcamento.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </StyledContainer>
    </Layout>
  );
};

export default OrcamentosPage;
