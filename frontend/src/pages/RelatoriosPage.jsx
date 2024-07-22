import React from 'react';
import { Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { FaCalendar } from 'react-icons/fa';
import styled from 'styled-components';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import Layout from '../layout/Layout';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend, PointElement);

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
`;

function RelatoriosPage() {
  const incomeExpenseData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Receitas',
        data: [4500, 5000, 4800, 5200, 5000, 5500],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Despesas',
        data: [3500, 3800, 3600, 3900, 3700, 4000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const expenseDistributionData = {
    labels: ['Aluguel', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Outros'],
    datasets: [{
      data: [1200, 800, 500, 400, 300, 300],
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
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'Saldo',
      data: [1000, 1200, 1400, 1700, 2000, 2500],
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
                  <span className="badge bg-primary rounded-pill">R$ 5.000,00</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Total de Despesas
                  <span className="badge bg-danger rounded-pill">R$ 3.500,00</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Saldo
                  <span className="badge bg-success rounded-pill">R$ 1.500,00</span>
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
                {['Aluguel', 'Alimentação', 'Transporte', 'Lazer', 'Saúde'].map((item, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {item}
                    <span className="badge bg-primary rounded-pill">R$ {1200 - index * 200},00</span>
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
