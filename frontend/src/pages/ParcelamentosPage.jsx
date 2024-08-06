import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash,
  faCalculator,
  faEye,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};

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
    background-color: ${props => props.isDarkMode ? '#4e4e4e' : '#e0e0e0'};
    left: 18px;
    top: 0;
  }
`;

const TimelineContent = styled.div`
  padding: 10px 20px;
  background-color: ${props => props.isDarkMode ? '#3c3c3c' : '#f8f9fa'};
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

const StyledTable = styled(Table)`
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
    color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
  }

  .modal-header {
    border-bottom: 1px solid ${props => props.isDarkMode ? '#444' : '#dee2e6'};
  }

  .modal-footer {
    border-top: 1px solid ${props => props.isDarkMode ? '#444' : '#dee2e6'};
  }

  .close {
    color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
  }
`;

const ParcelamentosPage = () => {
  const { isDarkMode } = useTheme();
  const [parcelamentos, setParcelamentos] = useState([]);
  const [novoParcelamento, setNovoParcelamento] = useState({
    descricao: '',
    valor_total: '',
    numero_parcelas: '',
    data_inicio: ''
  });
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedParcelamento, setEditedParcelamento] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsParcelamento, setDetailsParcelamento] = useState(null);

  useEffect(() => {
    fetchParcelamentos();
  }, []);

  const fetchParcelamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/parcelamentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setParcelamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar parcelamentos:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoParcelamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/parcelamentos', novoParcelamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNovoParcelamento({ descricao: '', valor_total: '', numero_parcelas: '', data_inicio: '' });
      fetchParcelamentos();
    } catch (error) {
      console.error('Erro ao adicionar parcelamento:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/parcelamentos/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchParcelamentos();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Erro ao deletar parcelamento:', error);
    }
  };

  const handleEdit = (parcelamento) => {
    setEditingId(parcelamento.id);
    setEditedParcelamento(parcelamento);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedParcelamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/parcelamentos/${editingId}`, editedParcelamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      fetchParcelamentos();
    } catch (error) {
      console.error('Erro ao editar parcelamento:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSimulation = (parcelamento) => {
    const valorTotal = parseFloat(parcelamento.valor_total);
    const numeroParcelas = parseInt(parcelamento.numero_parcelas);
    const taxaDesconto = 0.1; // 10% de desconto

    const valorParcela = valorTotal / numeroParcelas;
    const valorTotalComDesconto = valorTotal * (1 - taxaDesconto);
    const economia = valorTotal - valorTotalComDesconto;

    setSimulationResult({
      valorParcela: valorParcela,
      valorTotalComDesconto: valorTotalComDesconto,
      economia: economia,
      numeroParcelas: numeroParcelas
    });

    setShowSimulationModal(true);
  };

  const handleShowDetails = (parcelamento) => {
    setDetailsParcelamento(parcelamento);
    setShowDetailsModal(true);
  };

  const chartData = {
    labels: parcelamentos.map(p => p.descricao),
    datasets: [
      {
        data: parcelamentos.map(p => p.valor_total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      }
    ]
  };

  const chartOptions = {
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
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Parcelamentos</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Novo Parcelamento</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="descricao"
                          value={novoParcelamento.descricao}
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
                          value={novoParcelamento.valor_total}
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
                          name="numero_parcelas"
                          value={novoParcelamento.numero_parcelas}
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
                          name="data_inicio"
                          value={novoParcelamento.data_inicio}
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
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Distribuição de Parcelamentos</Card.Title>
                <ChartContainer>
                  <Pie data={chartData} options={chartOptions} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={6}>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Resumo de Parcelamentos</Card.Title>
                <StyledTable striped bordered hover variant={isDarkMode ? 'dark' : 'light'}>
                  <thead>
                    <tr>
                      <th>Total Parcelado</th>
                      <th>Parcelas Restantes</th>
                      <th>Valor Mensal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>R$ {parcelamentos.reduce((acc, curr) => acc + parseFloat(curr.valor_total), 0).toFixed(2)}</td>
                      <td>{parcelamentos.reduce((acc, curr) => acc + parseInt(curr.numero_parcelas), 0)}</td>
                      <td>R$ {parcelamentos.reduce((acc, curr) => acc + (parseFloat(curr.valor_total) / parseInt(curr.numero_parcelas)), 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </StyledTable>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Timeline de Pagamentos Futuros</Card.Title>
                <TimelineContainer>
                  {parcelamentos.map((parcelamento, index) => (
                    <TimelineItem key={parcelamento.id} isDarkMode={isDarkMode}>
                      <TimelineContent isDarkMode={isDarkMode}>
                        <h6>{parcelamento.descricao}</h6>
                        <p>Próximo pagamento: R$ {(parseFloat(parcelamento.valor_total) / parseInt(parcelamento.numero_parcelas)).toFixed(2)}</p>
                        <p>Data: {new Date(parcelamento.data_inicio).toLocaleDateString()}</p>
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
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Lista de Parcelamentos</Card.Title>
                <StyledTable striped hover variant={isDarkMode ? 'dark' : 'light'}>
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
                  {parcelamentos.map((parcelamento) => (
                      <tr key={parcelamento.id}>
                        <td>
                          {editingId === parcelamento.id ? (
                            <Form.Control
                              type="text"
                              name="descricao"
                              value={editedParcelamento.descricao}
                              onChange={handleEditChange}
                            />
                          ) : (
                            parcelamento.descricao
                          )}
                        </td>
                        <td>
                          {editingId === parcelamento.id ? (
                            <Form.Control
                              type="number"
                              name="valor_total"
                              value={editedParcelamento.valor_total}
                              onChange={handleEditChange}
                            />
                          ) : (
                            `R$ ${parseFloat(parcelamento.valor_total).toFixed(2)}`
                          )}
                        </td>
                        <td>
                          {editingId === parcelamento.id ? (
                            <Form.Control
                              type="number"
                              name="numero_parcelas"
                              value={editedParcelamento.numero_parcelas}
                              onChange={handleEditChange}
                            />
                          ) : (
                            parcelamento.numero_parcelas
                          )}
                        </td>
                        <td>R$ {(parseFloat(parcelamento.valor_total) / parseInt(parcelamento.numero_parcelas)).toFixed(2)}</td>
                        <td>
                          {editingId === parcelamento.id ? (
                            <Form.Control
                              type="date"
                              name="data_inicio"
                              value={editedParcelamento.data_inicio}
                              onChange={handleEditChange}
                            />
                          ) : (
                            parcelamento.data_inicio
                          )}
                        </td>
                        <td>
                          {editingId === parcelamento.id ? (
                            <>
                              <Button variant="success" size="sm" onClick={handleSaveEdit} className="mr-2">
                                <FontAwesomeIcon icon={faCheck} />
                              </Button>
                              <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                                <FontAwesomeIcon icon={faTimes} />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline-primary" size="sm" className="mr-2" onClick={() => handleEdit(parcelamento)}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button variant="outline-danger" size="sm" className="mr-2" onClick={() => handleDeleteClick(parcelamento.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                              <Button variant="outline-info" size="sm" className="mr-2" onClick={() => handleSimulation(parcelamento)}>
                                <FontAwesomeIcon icon={faCalculator} />
                              </Button>
                              <Button variant="outline-secondary" size="sm" onClick={() => handleShowDetails(parcelamento)}>
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <StyledModal show={showSimulationModal} onHide={() => setShowSimulationModal(false)} isDarkMode={isDarkMode}>
          <Modal.Header closeButton>
            <Modal.Title>Simulação de Antecipação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {simulationResult && (
              <>
                <p>Valor da parcela: R$ {simulationResult.valorParcela.toFixed(2)}</p>
                <p>Valor total com desconto: R$ {simulationResult.valorTotalComDesconto.toFixed(2)}</p>
                <p>Economia: R$ {simulationResult.economia.toFixed(2)}</p>
                <p>Parcelas antecipadas: {simulationResult.numeroParcelas}</p>
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
        </StyledModal>

        <StyledModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} isDarkMode={isDarkMode}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir este parcelamento?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
          </Modal.Footer>
        </StyledModal>

        <StyledModal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} isDarkMode={isDarkMode}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Parcelamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {detailsParcelamento && (
              <>
                <p><strong>Descrição:</strong> {detailsParcelamento.descricao}</p>
                <p><strong>Valor Total:</strong> R$ {parseFloat(detailsParcelamento.valor_total).toFixed(2)}</p>
                <p><strong>Número de Parcelas:</strong> {detailsParcelamento.numero_parcelas}</p>
                <p><strong>Valor da Parcela:</strong> R$ {(parseFloat(detailsParcelamento.valor_total) / parseInt(detailsParcelamento.numero_parcelas)).toFixed(2)}</p>
                <p><strong>Data de Início:</strong> {new Date(detailsParcelamento.data_inicio).toLocaleDateString()}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </StyledModal>
      </Container>
    </Layout>
  );
};

export default ParcelamentosPage;
