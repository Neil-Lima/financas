import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faSignOutAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import Layout from '../layout/Layout';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: ${props => props.isDarkMode ? '#1e1e1e' : '#fff'};
  color: ${props => props.isDarkMode ? '#fff' : '#333'};
  border: ${props => props.isDarkMode ? '1px solid #333' : 'none'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/usuarios/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserName(response.data.nome);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const financialData = {
    saldoAtual: 5000,
    despesasMes: 2500,
    receitasMes: 4000,
    investimentos: 10000,
    metas: [
      { nome: 'Férias', valor: 5000, progresso: 60 },
      { nome: 'Novo Carro', valor: 30000, progresso: 25 },
    ],
    ultimasTransacoes: [
      { data: '2023-09-01', descricao: 'Salário', valor: 4000, tipo: 'receita' },
      { data: '2023-09-02', descricao: 'Aluguel', valor: -1500, tipo: 'despesa' },
      { data: '2023-09-03', descricao: 'Supermercado', valor: -300, tipo: 'despesa' },
    ],
  };

  const despesasPorCategoria = {
    labels: ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde'],
    datasets: [{
      data: [1500, 500, 300, 200, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    }]
  };

  const fluxoCaixa = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receitas',
        data: [4000, 3900, 4100, 4000, 4200, 4000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Despesas',
        data: [2500, 2600, 2400, 2800, 2700, 2500],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Bem-vindo, {userName}!</h2>
          </Col>
          <Col xs="auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Saldo Atual</Card.Title>
                <h3 className="text-primary">R$ {financialData.saldoAtual.toFixed(2)}</h3>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={4} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Despesas do Mês</Card.Title>
                <h3 className="text-danger">R$ {financialData.despesasMes.toFixed(2)}</h3>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Investimentos</Card.Title>
                <ChartContainer>
                  <Doughnut 
                    data={{
                      labels: ['Ações', 'Fundos Imobiliários', 'Tesouro Direto'],
                      datasets: [{
                        data: [5000, 3000, 2000],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                        ],
                      }]
                    }} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: isDarkMode ? '#fff' : '#333'
                          }
                        }
                      }
                    }}
                  />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={6} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Metas Financeiras</Card.Title>
                {financialData.metas.map((meta, index) => (
                  <div key={index} className="mb-3">
                    <h6>{meta.nome}</h6>
                    <ProgressBar now={meta.progresso} label={`${meta.progresso}%`} />
                    <small>Meta: R$ {meta.valor.toFixed(2)}</small>
                  </div>
                ))}
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Últimas Transações</Card.Title>
                <Table striped bordered hover variant={isDarkMode ? 'dark' : 'light'}>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Valor</th>
                      <th>Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.ultimasTransacoes.map((transacao, index) => (
                      <tr key={index}>
                        <td>{transacao.data}</td>
                        <td>{transacao.descricao}</td>
                        <td className={transacao.tipo === 'receita' ? 'text-success' : 'text-danger'}>
                          R$ {Math.abs(transacao.valor).toFixed(2)}
                        </td>
                        <td>{transacao.tipo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={6} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Despesas por Categoria</Card.Title>
                <ChartContainer>
                  <Pie 
                    data={despesasPorCategoria} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: isDarkMode ? '#fff' : '#333'
                          }
                        }
                      }
                    }} 
                  />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={6} className="mb-4">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Fluxo de Caixa</Card.Title>
                <ChartContainer>
                  <Line 
                    data={fluxoCaixa} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: isDarkMode ? '#fff' : '#333'
                          }
                        }
                      },
                      scales: {
                        x: {
                          ticks: {
                            color: isDarkMode ? '#fff' : '#333'
                          }
                        },
                        y: {
                          ticks: {
                            color: isDarkMode ? '#fff' : '#333'
                          }
                        }
                      }
                    }} 
                  />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default HomePage;

