import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { FaCalendar } from 'react-icons/fa';
import styled from 'styled-components';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import Layout from '../layout/Layout';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend, PointElement);

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
`;

function RelatoriosPage() {
  const [relatorioData, setRelatorioData] = useState(null);

  useEffect(() => {
    const fetchRelatorioData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/relatorios/resumo-financeiro', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRelatorioData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do relatório', error);
      }
    };

    fetchRelatorioData();
  }, []);

  const incomeExpenseData = {
    labels: relatorioData ? Object.keys(relatorioData.saldoPorMes) : [],
    datasets: [
      {
        label: 'Receitas',
        data: relatorioData ? Object.values(relatorioData.receitasPorCategoria) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Despesas',
        data: relatorioData ? Object.values(relatorioData.gastosPorCategoria) : [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const expenseDistributionData = {
    labels: relatorioData ? Object.keys(relatorioData.gastosPorCategoria) : [],
    datasets: [{
      data: relatorioData ? Object.values(relatorioData.gastosPorCategoria) : [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const balanceEvolutionData = {
    labels: relatorioData ? Object.keys(relatorioData.saldoPorMes) : [],
    datasets: [{
      label: 'Saldo',
      data: relatorioData ? Object.values(relatorioData.saldoPorMes) : [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: true
    }]
  };

  return (
    <Layout>    
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Relatórios</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="outline-secondary" size="sm" className="me-2">Compartilhar</Button>
          <Button variant="outline-secondary" size="sm" className="me-2">Exportar</Button>
          <Button variant="outline-secondary" size="sm">
            <FaCalendar className="me-1" />
            Este mês
          </Button>
        </div>
      </div>

      <Row>
        <Col md={6} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Receitas vs Despesas</Card.Title>
              <Bar data={incomeExpenseData} options={{ responsive: true }} />
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={6} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Distribuição de Despesas</Card.Title>
              <Pie data={expenseDistributionData} options={{ responsive: true }} />
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Evolução do Saldo</Card.Title>
              <Line data={balanceEvolutionData} options={{ responsive: true }} />
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Resumo Financeiro</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Total de Receitas
                  <span className="badge bg-primary rounded-pill">
                    R$ {relatorioData ? relatorioData.totalReceitas.toFixed(2) : '0.00'}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Total de Despesas
                  <span className="badge bg-danger rounded-pill">
                    R$ {relatorioData ? relatorioData.totalDespesas.toFixed(2) : '0.00'}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Saldo
                  <span className="badge bg-success rounded-pill">
                    R$ {relatorioData ? relatorioData.saldo.toFixed(2) : '0.00'}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={6} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Top 5 Despesas</Card.Title>
              <ListGroup variant="flush">
                {relatorioData && Object.entries(relatorioData.gastosPorCategoria)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([categoria, valor], index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      {categoria}
                      <span className="badge bg-primary rounded-pill">R$ {valor.toFixed(2)}</span>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </Layout>
  );
}

export default RelatoriosPage;

