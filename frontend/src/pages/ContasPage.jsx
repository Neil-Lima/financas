import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StyledContainer = styled(Container)`
  padding: 20px;
`;

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#333333'};
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const StyledTable = styled(Table)`
  color: ${props => props.isDarkMode ? '#ffffff' : '#333333'};
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
    color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
  }
`;

const ResponsiveButton = styled(Button)`
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }
`;

const ContasPage = () => {
  const { isDarkMode } = useTheme();
  const [contas, setContas] = useState([]);
  const [newConta, setNewConta] = useState({
    nome: '',
    tipo: '',
    saldo: '',
    instituicao: '',
    numero: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editedConta, setEditedConta] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConta(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/contas', newConta, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewConta({
        nome: '',
        tipo: '',
        saldo: '',
        instituicao: '',
        numero: ''
      });
      fetchContas();
    } catch (error) {
      console.error('Erro ao adicionar conta:', error);
    }
  };

  const handleEdit = (conta) => {
    setEditingId(conta._id);
    setEditedConta(conta);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedConta(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/contas/${editingId}`, editedConta, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      fetchContas();
    } catch (error) {
      console.error('Erro ao editar conta:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/contas/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowDeleteModal(false);
      fetchContas();
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
    }
  };

  const pieChartData = {
    labels: contas.map(conta => conta.nome),
    datasets: [
      {
        data: contas.map(conta => conta.saldo),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
      },
    ],
  };

  const barChartData = {
    labels: ['Conta Corrente', 'Conta Poupança', 'Cartão de Crédito', 'Investimento', 'Dinheiro', 'Outros'],
    datasets: [
      {
        label: 'Saldo Total por Tipo de Conta',
        data: ['Conta Corrente', 'Conta Poupança', 'Cartão de Crédito', 'Investimento', 'Dinheiro', 'Outros'].map(tipo =>
          contas.filter(conta => conta.tipo === tipo).reduce((acc, conta) => acc + parseFloat(conta.saldo), 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Layout>
      <StyledContainer fluid>
        <Row className="mb-4">
          <Col>
            <h2>Contas</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Nova Conta</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={6} lg={3} className="mb-3">
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="nome"
                          value={newConta.nome}
                          onChange={handleInputChange}
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-3">
                      <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control 
                          as="select"
                          name="tipo"
                          value={newConta.tipo}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione um tipo</option>
                          <option value="Conta Corrente">Conta Corrente</option>
                          <option value="Conta Poupança">Conta Poupança</option>
                          <option value="Cartão de Crédito">Cartão de Crédito</option>
                          <option value="Investimento">Investimento</option>
                          <option value="Dinheiro">Dinheiro</option>
                          <option value="Outros">Outros</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-3">
                      <Form.Group>
                        <Form.Label>Saldo</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="saldo"
                          value={newConta.saldo}
                          onChange={handleInputChange}
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-3">
                      <Form.Group>
                        <Form.Label>Instituição</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="instituicao"
                          value={newConta.instituicao}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} lg={3} className="mb-3">
                      <Form.Group>
                        <Form.Label>Número</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="numero"
                          value={newConta.numero}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <ResponsiveButton variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Conta
                  </ResponsiveButton>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Distribuição de Saldos</Card.Title>
                <ChartContainer>
                  <Pie data={pieChartData} options={chartOptions} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col xs={12} lg={6}>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Saldo por Tipo de Conta</Card.Title>
                <ChartContainer>
                  <Bar data={barChartData} options={chartOptions} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Lista de Contas</Card.Title>
                <div className="table-responsive">
                  <StyledTable striped bordered hover variant={isDarkMode ? 'dark' : 'light'}>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Saldo</th>
                        <th>Instituição</th>
                        <th>Número</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contas.map((conta) => (
                        <tr key={conta._id}>
                          <td>
                            {editingId === conta._id ? (
                              <Form.Control
                                type="text"
                                name="nome"
                                value={editedConta.nome}
                                onChange={handleEditChange}
                              />
                            ) : (
                              conta.nome
                            )}
                          </td>
                          <td>
                            {editingId === conta._id ? (
                              <Form.Control
                                as="select"
                                name="tipo"
                                value={editedConta.tipo}
                                onChange={handleEditChange}
                              >
                                <option value="Conta Corrente">Conta Corrente</option>
                                <option value="Conta Poupança">Conta Poupança</option>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Investimento">Investimento</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Outros">Outros</option>
                              </Form.Control>
                            ) : (
                              conta.tipo
                            )}
                          </td>
                          <td>
                            {editingId === conta._id ? (
                              <Form.Control
                                type="number"
                                name="saldo"
                                value={editedConta.saldo}
                                onChange={handleEditChange}
                              />
                            ) : (
                              `R$ ${parseFloat(conta.saldo).toFixed(2)}`
                            )}
                          </td>
                          <td>
                            {editingId === conta._id ? (
                              <Form.Control
                                type="text"
                                name="instituicao"
                                value={editedConta.instituicao}
                                onChange={handleEditChange}
                              />
                            ) : (
                              conta.instituicao
                            )}
                          </td>
                          <td>
                            {editingId === conta._id ? (
                              <Form.Control
                                type="text"
                                name="numero"
                                value={editedConta.numero}
                                onChange={handleEditChange}
                              />
                            ) : (
                              conta.numero
                            )}
                          </td>
                          <td>
                            {editingId === conta._id ? (
                              <>
                                <ResponsiveButton variant="success" size="sm" onClick={handleSaveEdit}>
                                  <FontAwesomeIcon icon={faCheck} />
                                </ResponsiveButton>
                                <ResponsiveButton variant="secondary" size="sm" onClick={() => setEditingId(null)}>
                                  <FontAwesomeIcon icon={faTimes} />
                                </ResponsiveButton>
                              </>
                            ) : (
                              <>
                                <ResponsiveButton variant="outline-primary" size="sm" className="mr-2" onClick={() => handleEdit(conta)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </ResponsiveButton>
                                <ResponsiveButton variant="outline-danger" size="sm" onClick={() => handleDeleteClick(conta._id)}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </ResponsiveButton>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </StyledTable>
                </div>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <StyledModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} isDarkMode={isDarkMode}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir esta conta?</Modal.Body>
          <Modal.Footer>
            <ResponsiveButton variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </ResponsiveButton>
            <ResponsiveButton variant="danger" onClick={handleDelete}>
              Excluir
            </ResponsiveButton>
          </Modal.Footer>
        </StyledModal>
      </StyledContainer>
    </Layout>
  );
};

export default ContasPage;

