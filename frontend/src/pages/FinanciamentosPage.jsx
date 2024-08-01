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
import axios from 'axios';

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

const FinanciamentosPage = () => {
  const [financiamentos, setFinanciamentos] = useState([]);
  const [openDropdown, setOpenDropdown] = useState('');
  const chartRef = useRef(null);
  const [newFinanciamento, setNewFinanciamento] = useState({
    descricao: '',
    valor_total: '',
    parcelas_totais: '',
    taxa_juros: '',
    data_inicio: ''
  });
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

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

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? '' : name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFinanciamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/financiamentos', newFinanciamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewFinanciamento({
        descricao: '',
        valor_total: '',
        parcelas_totais: '',
        taxa_juros: '',
        data_inicio: ''
      });
      fetchFinanciamentos();
    } catch (error) {
      console.error('Erro ao adicionar financiamento:', error);
    }
  };

  const handleDelete = async (id) => {
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

  const handleSimulation = (financiamento) => {
    const totalAmount = financiamento.valor_total;
    const remainingInstallments = financiamento.parcelas_totais;
    const interestRate = financiamento.taxa_juros / 100; // Convertendo para decimal

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

  const chartData = {
    labels: financiamentos.map(f => f.descricao),
    datasets: [
      {
        data: financiamentos.map(f => f.valor_total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      }
    ]
  };

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
                          name="descricao"
                          value={newFinanciamento.descricao}
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
                          name="valor_total"
                          value={newFinanciamento.valor_total}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Parcelas Totais</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="parcelas_totais"
                          value={newFinanciamento.parcelas_totais}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Taxa de Juros (%)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="taxa_juros"
                          value={newFinanciamento.taxa_juros}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Data de Início</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="data_inicio"
                          value={newFinanciamento.data_inicio}
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
                    <Bar 
                      data={chartData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                          title: {
                            display: true,
                            text: 'Valor Total por Financiamento'
                          }
                        }
                      }} 
                    />
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
                        <td>R$ {financiamentos.reduce((acc, curr) => acc + curr.valor_total, 0).toFixed(2)}</td>
                        <td>{financiamentos.reduce((acc, curr) => acc + curr.parcelas_totais, 0)}</td>
                        <td>R$ {financiamentos.reduce((acc, curr) => {
                          const monthlyInterestRate = (curr.taxa_juros / 100) / 12;
                          const monthlyPayment = (curr.valor_total * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, curr.parcelas_totais)) / (Math.pow(1 + monthlyInterestRate, curr.parcelas_totais) - 1);
                          return acc + monthlyPayment;
                        }, 0).toFixed(2)}</td>
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
                    {financiamentos.map((financiamento) => (
                        <tr key={financiamento.id}>
                          <td>{financiamento.descricao}</td>
                          <td>R$ {financiamento.valor_total.toFixed(2)}</td>
                          <td>{financiamento.parcelas_totais}</td>
                          <td>R$ {((financiamento.valor_total * (financiamento.taxa_juros / 100 / 12) * Math.pow(1 + financiamento.taxa_juros / 100 / 12, financiamento.parcelas_totais)) / (Math.pow(1 + financiamento.taxa_juros / 100 / 12, financiamento.parcelas_totais) - 1)).toFixed(2)}</td>
                          <td>{financiamento.data_inicio}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="mr-2">
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button variant="outline-danger" size="sm" className="mr-2" onClick={() => handleDelete(financiamento.id)}>
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
  
