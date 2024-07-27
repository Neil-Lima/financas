import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, Button, Form, Table, Collapse, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faWallet, 
  faChartPie, 
  faUser, 
  faCog, 
  faHistory, 
  faMoon, 
  faBell, 
  faCommentDots, 
  faCalendarAlt,
  faFileInvoiceDollar,
  faCreditCard,
  faHandHoldingUsd,
  faExclamationTriangle,
  faPiggyBank,
  faMoneyBillWave,
  faChartLine,
  faBalanceScale,
  faAngleDown,
  faAngleUp,
  faPlus,
  faEdit,
  faTrash,
  faFileImport
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Layout from '../layout/Layout';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledCard = styled(Card)`
  border: none;
  height: 100%;
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

const financiamentosData = [
  { id: 1, description: 'Financiamento Casa', totalAmount: 300000.00, remainingInstallments: 240, monthlyPayment: 2500.00, startDate: '2023-01-15' },
  { id: 2, description: 'Financiamento Carro', totalAmount: 50000.00, remainingInstallments: 48, monthlyPayment: 1200.00, startDate: '2023-03-01' },
  { id: 3, description: 'Financiamento Equipamentos', totalAmount: 20000.00, remainingInstallments: 24, monthlyPayment: 950.00, startDate: '2023-05-10' },
];

const chartData = {
  labels: ['Casa', 'Carro', 'Equipamentos'],
  datasets: [
    {
      data: [300000, 50000, 20000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
    }
  ]
};

const FinanciamentosPage = () => {
  const [openDropdown, setOpenDropdown] = useState('');
  const chartRef = useRef(null);
  const [newFinanciamento, setNewFinanciamento] = useState({
    description: '',
    totalAmount: '',
    installments: '',
    startDate: ''
  });
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? '' : name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFinanciamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo financiamento:', newFinanciamento);
    setNewFinanciamento({ description: '', totalAmount: '', installments: '', startDate: '' });
  };

  const handleSimulation = (financiamento) => {
    const totalAmount = financiamento.totalAmount;
    const remainingInstallments = financiamento.remainingInstallments;
    const interestRate = 0.05; // 5% de juros ao ano

    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment = (totalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, remainingInstallments)) / (Math.pow(1 + monthlyInterestRate, remainingInstallments) - 1);

    const totalInterest = (monthlyPayment * remainingInstallments) - totalAmount;

    setSimulationResult({
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      totalAmount: totalAmount,
      remainingInstallments: remainingInstallments
    });

    setShowSimulationModal(true);
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new ChartJS(chartRef.current, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Distribuição de Financiamentos'
            }
          }
        }
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Financiamentos</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Novo Financiamento</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="description"
                          value={newFinanciamento.description}
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
                          value={newFinanciamento.totalAmount}
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
                          value={newFinanciamento.installments}
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
                          value={newFinanciamento.startDate}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    Adicionar Financiamento
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
                <Card.Title>Distribuição de Financiamentos</Card.Title>
                <ChartContainer>
                  <canvas ref={chartRef} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={6}>
            <StyledCard>
              <Card.Body>
                <Card.Title>Resumo de Financiamentos</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Total Financiado</th>
                      <th>Parcelas Restantes</th>
                      <th>Valor Mensal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>R$ {financiamentosData.reduce((acc, curr) => acc + curr.totalAmount, 0).toFixed(2)}</td>
                      <td>{financiamentosData.reduce((acc, curr) => acc + curr.remainingInstallments, 0)}</td>
                      <td>R$ {financiamentosData.reduce((acc, curr) => acc + curr.monthlyPayment, 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Lista de Financiamentos</Card.Title>
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
                  {financiamentosData.map((financiamento) => (
                      <tr key={financiamento.id}>
                        <td>{financiamento.description}</td>
                        <td>R$ {financiamento.totalAmount.toFixed(2)}</td>
                        <td>{financiamento.remainingInstallments}</td>
                        <td>R$ {financiamento.monthlyPayment.toFixed(2)}</td>
                        <td>{financiamento.startDate}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="outline-danger" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                          <Button variant="outline-info" size="sm" onClick={() => handleSimulation(financiamento)}>
                            Simular Antecipação
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
            <Modal.Title>Simulação de Financiamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {simulationResult && (
              <>
                <p>Valor da parcela mensal: R$ {simulationResult.monthlyPayment.toFixed(2)}</p>
                <p>Total de juros a pagar: R$ {simulationResult.totalInterest.toFixed(2)}</p>
                <p>Valor total financiado: R$ {simulationResult.totalAmount.toFixed(2)}</p>
                <p>Número de parcelas restantes: {simulationResult.remainingInstallments}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSimulationModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
};

export default FinanciamentosPage;
