import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash,
  faCalculator
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
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

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
`;

const TimelineItem = styled.div`
  padding: 10px 0;
  position: relative;
  background-color: inherit;
  width: 100%;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: #e0e0e0;
    left: 18px;
    top: 0;
  }
`;

const TimelineContent = styled.div`
  padding: 10px 20px;
  background-color: #f8f9fa;
  position: relative;
  border-radius: 6px;
  margin-left: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #4e9af1;
    border-radius: 50%;
    left: -26px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const parcelamentosData = [
  { id: 1, description: 'Notebook', totalAmount: 3000.00, remainingInstallments: 8, monthlyPayment: 375.00, startDate: '2023-05-15' },
  { id: 2, description: 'Smartphone', totalAmount: 1200.00, remainingInstallments: 4, monthlyPayment: 300.00, startDate: '2023-07-01' },
  { id: 3, description: 'Geladeira', totalAmount: 2500.00, remainingInstallments: 10, monthlyPayment: 250.00, startDate: '2023-08-10' },
  { id: 4, description: 'TV', totalAmount: 1800.00, remainingInstallments: 6, monthlyPayment: 300.00, startDate: '2023-06-20' },
];

const chartData = {
  labels: ['Notebook', 'Smartphone', 'Geladeira', 'TV'],
  datasets: [
    {
      data: [3000, 1200, 2500, 1800],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
    }
  ]
};

const ParcelamentosPage = () => {
  const [newParcelamento, setNewParcelamento] = useState({
    description: '',
    totalAmount: '',
    installments: '',
    startDate: ''
  });
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParcelamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo parcelamento:', newParcelamento);
    setNewParcelamento({ description: '', totalAmount: '', installments: '', startDate: '' });
  };

  const handleSimulation = (parcelamento) => {
    const totalAmount = parcelamento.totalAmount;
    const remainingInstallments = parcelamento.remainingInstallments;
    const discountRate = 0.1;

    const discountedAmount = totalAmount * (1 - discountRate);
    const savings = totalAmount - discountedAmount;

    setSimulationResult({
      originalAmount: totalAmount,
      discountedAmount: discountedAmount,
      savings: savings,
      remainingInstallments: remainingInstallments
    });

    setShowSimulationModal(true);
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Parcelamentos</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Novo Parcelamento</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="description" 
                          value={newParcelamento.description} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Valor Total</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="totalAmount" 
                          value={newParcelamento.totalAmount} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Número de Parcelas</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="installments" 
                          value={newParcelamento.installments} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Data de Início</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="startDate" 
                          value={newParcelamento.startDate} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Parcelamento
                  </Button>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <StyledCard>
              <Card.Body>
                <Card.Title>Distribuição de Parcelamentos</Card.Title>
                <ChartContainer>
                  <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={6}>
            <StyledCard>
              <Card.Body>
                <Card.Title>Resumo de Parcelamentos</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Total Parcelado</th>
                      <th>Parcelas Restantes</th>
                      <th>Valor Mensal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>R$ {parcelamentosData.reduce((acc, curr) => acc + curr.totalAmount, 0).toFixed(2)}</td>
                      <td>{parcelamentosData.reduce((acc, curr) => acc + curr.remainingInstallments, 0)}</td>
                      <td>R$ {parcelamentosData.reduce((acc, curr) => acc + curr.monthlyPayment, 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Timeline de Pagamentos Futuros</Card.Title>
                <TimelineContainer>
                  {parcelamentosData.map((parcelamento, index) => (
                    <TimelineItem key={parcelamento.id}>
                      <TimelineContent>
                        <h6>{parcelamento.description}</h6>
                        <p>Próximo pagamento: R$ {parcelamento.monthlyPayment.toFixed(2)}</p>
                        <p>Data: {new Date(parcelamento.startDate).toLocaleDateString()}</p>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </TimelineContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Lista de Parcelamentos</Card.Title>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Valor Total</th>
                      <th>Parcelas Restantes</th>
                      <th>Valor Mensal</th>
                      <th>Data de Início</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                  {parcelamentosData.map((parcelamento) => (
                      <tr key={parcelamento.id}>
                        <td>{parcelamento.description}</td>
                        <td>R$ {parcelamento.totalAmount.toFixed(2)}</td>
                        <td>{parcelamento.remainingInstallments}</td>
                        <td>R$ {parcelamento.monthlyPayment.toFixed(2)}</td>
                        <td>{parcelamento.startDate}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="outline-danger" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                          <Button variant="outline-info" size="sm" onClick={() => handleSimulation(parcelamento)}>
                            <FontAwesomeIcon icon={faCalculator} /> Simular
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

        <Modal show={showSimulationModal} onHide={() => setShowSimulationModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Simulação de Antecipação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {simulationResult && (
              <>
                <p>Valor original: R$ {simulationResult.originalAmount.toFixed(2)}</p>
                <p>Valor com desconto: R$ {simulationResult.discountedAmount.toFixed(2)}</p>
                <p>Economia: R$ {simulationResult.savings.toFixed(2)}</p>
                <p>Parcelas antecipadas: {simulationResult.remainingInstallments}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSimulationModal(false)}>
              Fechar
            </Button>
            <Button variant="primary">
              Confirmar Antecipação
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
};

export default ParcelamentosPage;
