import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Layout from '../layout/Layout';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const EstoquePage = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '', precoUnitario: '', categoria: '' });
  const [editandoProduto, setEditandoProduto] = useState(null);

  useEffect(() => {
    fetchProdutos();
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
      setNovoProduto({ nome: '', quantidade: '', precoUnitario: '', categoria: '' });
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const iniciarEdicao = (produto) => {
    setEditandoProduto(produto);
    setNovoProduto(produto);
  };

  const cancelarEdicao = () => {
    setEditandoProduto(null);
    setNovoProduto({ nome: '', quantidade: '', precoUnitario: '', categoria: '' });
  };

  const salvarEdicao = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/estoque/${editandoProduto.id}`, novoProduto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditandoProduto(null);
      setNovoProduto({ nome: '', quantidade: '', precoUnitario: '', categoria: '' });
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  const deletarProduto = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/estoque/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
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
        data: produtos.map(produto => produto.quantidade * produto.precoUnitario),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  return (
    <Layout>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2>Controle de Estoque</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>{editandoProduto ? 'Editar Produto' : 'Novo Produto'}</Card.Title>
                <Form onSubmit={editandoProduto ? salvarEdicao : adicionarProduto}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Nome do Produto</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="nome"
                          value={novoProduto.nome}
                          onChange={handleNovoProdutoChange}
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
                          value={novoProduto.quantidade}
                          onChange={handleNovoProdutoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Preço Unitário</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="precoUnitario"
                          value={novoProduto.precoUnitario}
                          onChange={handleNovoProdutoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control 
                          as="select"
                          name="categoria"
                          value={novoProduto.categoria}
                          onChange={handleNovoProdutoChange}
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Categoria 1">Categoria 1</option>
                          <option value="Categoria 2">Categoria 2</option>
                          <option value="Categoria 3">Categoria 3</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={editandoProduto ? faEdit : faPlus} className="mr-2" />
                    {editandoProduto ? 'Salvar Alterações' : 'Adicionar Produto'}
                  </Button>
                  {editandoProduto && (
                    <Button variant="secondary" onClick={cancelarEdicao} className="mt-3 ml-2">
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
            <StyledCard>
              <Card.Body>
                <Card.Title>Visão Geral do Estoque</Card.Title>
                <ChartContainer>
                  <Bar 
                    data={dadosGrafico} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Quantidade / Valor (R$)'
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Produtos'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Quantidade e Valor Total por Produto'
                        }
                      }
                    }}
                  />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <StyledCard>
          <Card.Body>
            <Card.Title>Lista de Produtos</Card.Title>
            <Table striped bordered hover>
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
                    <td>R$ {parseFloat(produto.precoUnitario).toFixed(2)}</td>
                    <td>R$ {(produto.quantidade * produto.precoUnitario).toFixed(2)}</td>
                    <td>{produto.categoria}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="mr-2" onClick={() => iniciarEdicao(produto)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => deletarProduto(produto.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </StyledCard>
      </Container>
    </Layout>
  );
};

export default EstoquePage;
