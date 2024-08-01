import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form, Table, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Layout from '../layout/Layout';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const TransacoesPage = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [contas, setContas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    conta_id: "",
    categoria_id: "",
    descricao: "",
    valor: "",
    data: "",
    tipo: "",
  });
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);

  useEffect(() => {
    fetchTransacoes();
    fetchContas();
    fetchCategorias();
  }, []);

  const fetchTransacoes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/transacoes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/transacoes', newTransaction, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewTransaction({
        conta_id: "",
        categoria_id: "",
        descricao: "",
        valor: "",
        data: "",
        tipo: "",
      });
      fetchTransacoes();
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/transacoes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTransacoes();
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
    }
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (importFile) {
      console.log("Arquivo importado:", importFile);
      setShowImportModal(false);
    }
  };

  const chartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Receitas",
        data: [4000, 4200, 4100, 4300, 4000, 4500],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Despesas",
        data: [3000, 3200, 2800, 3100, 2900, 3300],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Transações</h2>
          </Col>
          <Col className="text-right">
            <Button variant="primary" onClick={() => setShowImportModal(true)}>
              <FontAwesomeIcon icon={faFileImport} /> Importar Extrato
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Nova Transação</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Conta</Form.Label>
                        <Form.Control
                          as="select"
                          name="conta_id"
                          value={newTransaction.conta_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione uma conta</option>
                          {contas.map(conta => (
                            <option key={conta.id} value={conta.id}>{conta.nome}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                          as="select"
                          name="categoria_id"
                          value={newTransaction.categoria_id}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                          type="text"
                          name="descricao"
                          value={newTransaction.descricao}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                          type="number"
                          name="valor"
                          value={newTransaction.valor}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                          type="date"
                          name="data"
                          value={newTransaction.data}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control
                          as="select"
                          name="tipo"
                          value={newTransaction.tipo}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione o tipo</option>
                          <option value="receita">Receita</option>
                          <option value="despesa">Despesa</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Transação
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
                <Card.Title>Visão Geral de Transações</Card.Title>
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
                <Card.Title>Lista de Transações</Card.Title>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th>Valor</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoes.map((transacao) => (
                      <tr key={transacao.id}>
                        <td>{transacao.data}</td>
                        <td>{transacao.descricao}</td>
                        <td>{categorias.find(cat => cat.id === transacao.categoria_id)?.nome}</td>
                        <td className={transacao.tipo === 'receita' ? "text-success" : "text-danger"}>
                          R$ {Math.abs(transacao.valor).toFixed(2)}
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(transacao.id)}>
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

        <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Importar Extrato Bancário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleImportSubmit}>
              <Form.Group>
                <Form.Label>Selecione o arquivo do extrato</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImportFile(e.target.files[0])}
                  accept=".csv,.xlsx,.xls"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Importar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </Layout>
  );
};

export default TransacoesPage;
