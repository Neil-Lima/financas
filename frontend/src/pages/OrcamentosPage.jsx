import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Layout from '../layout/Layout';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

const OrcamentosPage = () => {
  const [newBudget, setNewBudget] = useState({
    category: '',
    planned: '',
  });
  const [budgetData, setBudgetData] = useState([
    { id: 1, category: 'Alimentação', planned: 800, spent: 650, remaining: 150 },
    { id: 2, category: 'Moradia', planned: 1200, spent: 1200, remaining: 0 },
    { id: 3, category: 'Transporte', planned: 300, spent: 280, remaining: 20 },
    { id: 4, category: 'Lazer', planned: 200, spent: 150, remaining: 50 },
    { id: 5, category: 'Saúde', planned: 400, spent: 100, remaining: 300 },
  ]);
  const [alerts, setAlerts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo orçamento:', newBudget);
    setNewBudget({ category: '', planned: '' });
  };

  useEffect(() => {
    const newAlerts = budgetData.filter(budget => budget.spent > budget.planned)
      .map(budget => `${budget.category}: Ultrapassou o limite em R$ ${(budget.spent - budget.planned).toFixed(2)}`);
    setAlerts(newAlerts);
  }, [budgetData]);

  const chartData = {
    labels: budgetData.map(item => item.category),
    datasets: [
      {
        label: 'Planejado',
        data: budgetData.map(item => item.planned),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Gasto',
        data: budgetData.map(item => item.spent),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Orçamentos</h2>
          </Col>
        </Row>

        {alerts.length > 0 && (
          <Row className="mb-4">
            <Col>
              <Alert variant="warning">
                <Alert.Heading>Alertas de Ultrapassagem de Limites:</Alert.Heading>
                <ul>
                  {alerts.map((alert, index) => (
                    <li key={index}>{alert}</li>
                  ))}
                </ul>
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Novo Orçamento</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control 
                          as="select" 
                          name="category" 
                          value={newBudget.category} 
                          onChange={handleInputChange} 
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Alimentação">Alimentação</option>
                          <option value="Moradia">Moradia</option>
                          <option value="Transporte">Transporte</option>
                          <option value="Lazer">Lazer</option>
                          <option value="Saúde">Saúde</option>
                          <option value="Educação">Educação</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Valor Planejado</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="planned" 
                          value={newBudget.planned} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Orçamento
                  </Button>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Visão Geral de Orçamentos</Card.Title>
                <ChartContainer>
                  <Bar 
                    data={chartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Orçamento Planejado vs Gasto'
                        }
                      }
                    }} 
                  />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Lista de Orçamentos</Card.Title>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Categoria</th>
                      <th>Planejado</th>
                      <th>Gasto</th>
                      <th>Restante</th>
                      <th>Progresso</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.map((budget) => (
                      <tr key={budget.id}>
                        <td>{budget.category}</td>
                        <td>R$ {budget.planned.toFixed(2)}</td>
                        <td>R$ {budget.spent.toFixed(2)}</td>
                        <td>R$ {budget.remaining.toFixed(2)}</td>
                        <td>
                          <div className="progress">
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{
                                width: `${(budget.spent / budget.planned) * 100}%`,
                                backgroundColor: budget.spent > budget.planned ? 'red' : 'green'
                              }}
                              aria-valuenow={(budget.spent / budget.planned) * 100}
                              aria-valuemin="0" 
                              aria-valuemax="100"
                            >
                              {((budget.spent / budget.planned) * 100).toFixed(0)}%
                            </div>
                          </div>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default OrcamentosPage;
