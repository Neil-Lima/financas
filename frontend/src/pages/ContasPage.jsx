import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const StyledTable = styled(Table)`
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
`;

const ContasPage = () => {
  const { isDarkMode } = useTheme();
  const [contas, setContas] = useState([]);
  const [novaConta, setNovaConta] = useState({ nome: '', saldo: '', tipo: '' });

  useEffect(() => {
    fetchContas();
  }, []);

  const fetchContas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/contas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContas(response.data);
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
    }
  };

  const handleNovaContaChange = (e) => {
    setNovaConta({ ...novaConta, [e.target.name]: e.target.value });
  };

  const adicionarConta = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/contas', novaConta, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNovaConta({ nome: '', saldo: '', tipo: '' });
      fetchContas();
    } catch (error) {
      console.error('Erro ao adicionar conta:', error);
    }
  };

  const deletarConta = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/contas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContas();
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
    }
  };

  const despesasPorCategoria = {
    labels: contas.map(conta => conta.tipo),
    datasets: [{
      data: contas.map(conta => conta.saldo),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
    }]
  };

  const distribuicaoSaldos = {
    labels: contas.map(conta => conta.nome),
    datasets: [{
      label: 'Saldo',
      data: contas.map(conta => conta.saldo),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      y: {
        ticks: {
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
            <h2>Contas</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title></Card.Title>
                <Form onSubmit={adicionarConta}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Descrição da Conta</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="nome"
                          value={novaConta.nome}
                          onChange={handleNovaContaChange}
                          placeholder="Ex: compras no shopping" 
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Saldo Inicial</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="saldo"
                          value={novaConta.saldo}
                          onChange={handleNovaContaChange}
                          placeholder="0.00" 
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control 
                          as="select"
                          name="tipo"
                          value={novaConta.tipo}
                          onChange={handleNovaContaChange}
                          required
                        >
                          <option value="">Selecione um tipo</option>
                          <option value="Corrente">Corrente</option>
                          <option value="Poupança">Poupança</option>
                          <option value="Investimento">Investimento</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Conta
                  </Button>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={12} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Distribuição de Saldos</Card.Title>
                <ChartContainer>
                  <Pie data={despesasPorCategoria} options={chartOptions} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col lg={6} md={12} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Saldo por Conta</Card.Title>
                <ChartContainer>
                  <Bar data={distribuicaoSaldos} options={chartOptions} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <StyledCard isDarkMode={isDarkMode}>
          <Card.Body>
            <Card.Title>Lista de Contas</Card.Title>
            <StyledTable striped bordered hover variant={isDarkMode ? 'dark' : 'light'} isDarkMode={isDarkMode}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Saldo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {contas.map((conta) => (
                  <tr key={conta.id}>
                    <td>{conta.nome}</td>
                    <td>{conta.tipo}</td>
                    <td>R$ {parseFloat(conta.saldo).toFixed(2)}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => deletarConta(conta.id)}>
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

export default ContasPage;
