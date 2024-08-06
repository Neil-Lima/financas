import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  height: 400px;
  width: 100%;
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

const EstoquePage = () => {
  const { isDarkMode } = useTheme();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '', preco_unitario: '', categoria_id: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedProduto, setEditedProduto] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsProduto, setDetailsProduto] = useState(null);

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  const fetchProdutos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/estoque', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/categorias', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleNovoProdutoChange = (e) => {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/estoque', novoProduto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNovoProduto({ nome: '', quantidade: '', preco_unitario: '', categoria_id: '' });
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const handleEdit = (produto) => {
    setEditingId(produto.id);
    setEditedProduto(produto);
  };

  const handleEditChange = (e) => {
    setEditedProduto({ ...editedProduto, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/estoque/${editingId}`, editedProduto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const deletarProduto = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/estoque/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProdutos();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const handleShowDetails = (produto) => {
    setDetailsProduto(produto);
    setShowDetailsModal(true);
  };

  const dadosGrafico = {
    labels: produtos.map(produto => produto.nome),
    datasets: [
      {
        label: 'Quantidade em Estoque',
        data: produtos.map(produto => produto.quantidade),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Valor Total (R$)',
        data: produtos.map(produto => produto.quantidade * produto.preco_unitario),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      title: {
        display: true,
        text: 'Visão Geral do Estoque',
        color: isDarkMode ? '#ffffff' : '#000000'
      }
    }
  };

  return (
    <Layout>
      <StyledContainer>
        <Row className="mb-4">
          <Col>
            <h2>Controle de Estoque</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>{editingId ? 'Editar Produto' : 'Novo Produto'}</Card.Title>
                <Form onSubmit={editingId ? handleSaveEdit : adicionarProduto}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Nome do Produto</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="nome"
                          value={editingId ? editedProduto.nome : novoProduto.nome}
                          onChange={editingId ? handleEditChange : handleNovoProdutoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="quantidade"
                          value={editingId ? editedProduto.quantidade : novoProduto.quantidade}
                          onChange={editingId ? handleEditChange : handleNovoProdutoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Preço Unitário</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="preco_unitario"
                          value={editingId ? editedProduto.preco_unitario : novoProduto.preco_unitario}
                          onChange={editingId ? handleEditChange : handleNovoProdutoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control 
                          as="select"
                          name="categoria_id"
                          value={editingId ? editedProduto.categoria_id : novoProduto.categoria_id}
                          onChange={editingId ? handleEditChange : handleNovoProdutoChange}
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={editingId ? faCheck : faPlus} className="mr-2" />
                    {editingId ? 'Salvar Alterações' : 'Adicionar Produto'}
                  </Button>
                  {editingId && (
                    <Button variant="secondary" onClick={handleCancelEdit} className="mt-3 ml-2">
                      <FontAwesomeIcon icon={faTimes} className="mr-2" />
                      Cancelar Edição
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Visão Geral do Estoque</Card.Title>
                <ChartContainer>
                  <Bar data={dadosGrafico} options={opcoesGrafico} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <StyledCard isDarkMode={isDarkMode}>
          <Card.Body>
            <Card.Title>Lista de Produtos</Card.Title>
            <StyledTable striped bordered hover variant={isDarkMode ? 'dark' : 'light'} isDarkMode={isDarkMode}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Preço Unitário</th>
                  <th>Valor Total</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.quantidade}</td>
                    <td>R$ {parseFloat(produto.preco_unitario).toFixed(2)}</td>
                    <td>R$ {(produto.quantidade * produto.preco_unitario).toFixed(2)}</td>
                    <td>{categorias.find(cat => cat.id === produto.categoria_id)?.nome}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="mr-2" onClick={() => handleEdit(produto)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="outline-danger" size="sm" className="mr-2" onClick={() => handleDeleteClick(produto.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Button variant="outline-info" size="sm" onClick={() => handleShowDetails(produto)}>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </Card.Body>
        </StyledCard>

        <StyledModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} isDarkMode={isDarkMode}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir este produto?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={deletarProduto}>
              Excluir
            </Button>
          </Modal.Footer>
        </StyledModal>

        <StyledModal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} isDarkMode={isDarkMode}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {detailsProduto && (
              <>
                <p><strong>Nome:</strong> {detailsProduto.nome}</p>
                <p><strong>Quantidade:</strong> {detailsProduto.quantidade}</p>
                <p><strong>Preço Unitário:</strong> R$ {parseFloat(detailsProduto.preco_unitario).toFixed(2)}</p>
                <p><strong>Valor Total:</strong> R$ {(detailsProduto.quantidade * detailsProduto.preco_unitario).toFixed(2)}</p>
                <p><strong>Categoria:</strong> {categorias.find(cat => cat.id === detailsProduto.categoria_id)?.nome}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </StyledModal>
      </StyledContainer>
    </Layout>
  );
};

export default EstoquePage;
