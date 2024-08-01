import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
  height: 400px;
  width: 100%;
`;

const StyledTable = styled(Table)`
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
`;

const FinanciamentosPage = () => {
  const { isDarkMode } = useTheme();
  const [financiamentos, setFinanciamentos] = useState([]);
  const [novoFinanciamento, setNovoFinanciamento] = useState({ 
    descricao: '', 
    valorTotal: '', 
    taxaJuros: '', 
    prazo: '', 
    dataPrimeiraParcela: '' 
  });

  useEffect(() => {
    fetchFinanciamentos();
  }, []);

  const fetchFinanciamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/financiamentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFinanciamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar financiamentos:', error);
    }
  };

  const handleNovoFinanciamentoChange = (e) => {
    setNovoFinanciamento({ ...novoFinanciamento, [e.target.name]: e.target.value });
  };

  const adicionarFinanciamento = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/financiamentos', novoFinanciamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNovoFinanciamento({ 
        descricao: '', 
        valorTotal: '', 
        taxaJuros: '', 
        prazo: '', 
        dataPrimeiraParcela: '' 
      });
      fetchFinanciamentos();
    } catch (error) {
      console.error('Erro ao adicionar financiamento:', error);
    }
  };

  const deletarFinanciamento = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/financiamentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFinanciamentos();
    } catch (error) {
      console.error('Erro ao deletar financiamento:', error);
    }
  };

  const dadosGrafico = {
    labels: financiamentos.map(f => f.descricao),
    datasets: [
      {
        label: 'Valor Total',
        data: financiamentos.map(f => f.valorTotal),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      title: {
        display: true,
        text: 'Visão Geral dos Financiamentos',
        color: isDarkMode ? '#ffffff' : '#000000'
      }
    }
  };

  return (
    <Layout>
      <StyledContainer>
        <Row className="mb-4">
          <Col>
            <h2>Financiamentos</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Novo Financiamento</Card.Title>
                <Form onSubmit={adicionarFinanciamento}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="descricao"
                          value={novoFinanciamento.descricao}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Valor Total</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="valorTotal"
                          value={novoFinanciamento.valorTotal}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Taxa de Juros (%)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="taxaJuros"
                          value={novoFinanciamento.taxaJuros}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Prazo (meses)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="prazo"
                          value={novoFinanciamento.prazo}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Data da Primeira Parcela</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="dataPrimeiraParcela"
                          value={novoFinanciamento.dataPrimeiraParcela}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Financiamento
                  </Button>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Visão Geral dos Financiamentos</Card.Title>
                <ChartContainer>
                  <Line data={dadosGrafico} options={opcoesGrafico} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <StyledCard isDarkMode={isDarkMode}>
          <Card.Body>
            <Card.Title>Lista de Financiamentos</Card.Title>
            <StyledTable striped bordered hover variant={isDarkMode ? 'dark' : 'light'} isDarkMode={isDarkMode}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor Total</th>
                  <th>Taxa de Juros</th>
                  <th>Prazo</th>
                  <th>Data da Primeira Parcela</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {financiamentos.map((financiamento) => (
                  <tr key={financiamento.id}>
                    <td>{financiamento.descricao}</td>
                    <td>R$ {parseFloat(financiamento.valorTotal).toFixed(2)}</td>
                    <td>{financiamento.taxaJuros}%</td>
                    <td>{financiamento.prazo} meses</td>
                    <td>{new Date(financiamento.dataPrimeiraParcela).toLocaleDateString()}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => deletarFinanciamento(financiamento.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </Card.Body>
        </StyledCard>
      </StyledContainer>
    </Layout>
  );
};

export default FinanciamentosPage;
