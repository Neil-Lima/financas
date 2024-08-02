import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faFileImport,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Layout from "../layout/Layout";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: ${(props) => (props.isDarkMode ? "#2c2c2c" : "#ffffff")};
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
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
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ResponsiveButton = styled(Button)`
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }
`;

const TransacoesPage = () => {
  const { isDarkMode } = useTheme();
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
  const [editingId, setEditingId] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({});

  useEffect(() => {
    fetchTransacoes();
    fetchContas();
    fetchCategorias();
  }, []);

  const fetchTransacoes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/transacoes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const fetchContas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/contas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContas(response.data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/transacoes", newTransaction, {
        headers: { Authorization: `Bearer ${token}` },
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
      console.error("Erro ao adicionar transação:", error);
    }
  };

  const handleEdit = (transacao) => {
    setEditingId(transacao.id);
    setEditedTransaction(transacao);
  };

  const handleEditChange = (e, field) => {
    setEditedTransaction({ ...editedTransaction, [field]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/transacoes/${editingId}`,
        editedTransaction,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingId(null);
      fetchTransacoes();
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/transacoes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTransacoes();
      } catch (error) {
        console.error("Erro ao deletar transação:", error);
      }
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      },
      title: {
        display: true,
        text: "Visão Geral de Transações",
        color: isDarkMode ? "#ffffff" : "#000000",
      },
    },
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
            <StyledCard isDarkMode={isDarkMode}>
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
                          {contas.map((conta) => (
                            <option key={conta.id} value={conta.id}>
                              {conta.nome}
                            </option>
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
                          {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                              {categoria.nome}
                            </option>
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
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Visão Geral de Transações</Card.Title>
                <ChartContainer>
                  <Bar data={chartData} options={chartOptions} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Lista de Transações</Card.Title>
                <div className="table-responsive">
                  <StyledTable
                    striped
                    hover
                    variant={isDarkMode ? "dark" : "light"}
                    isDarkMode={isDarkMode}
                  >
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Conta</th>
                        <th>Valor</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transacoes.map((transacao) => (
                        <tr key={transacao.id}>
                          <td>
                            {editingId === transacao.id ? (
                              <Form.Control
                                type="date"
                                value={editedTransaction.data}
                                onChange={(e) => handleEditChange(e, "data")}
                              />
                            ) : (
                              transacao.data
                            )}
                          </td>
                          <td>
                            {editingId === transacao.id ? (
                              <Form.Control
                                type="text"
                                value={editedTransaction.descricao}
                                onChange={(e) =>
                                  handleEditChange(e, "descricao")
                                }
                              />
                            ) : (
                              transacao.descricao
                            )}
                          </td>
                          <td>
                            {editingId === transacao.id ? (
                              <Form.Control
                                as="select"
                                value={editedTransaction.categoria_id}
                                onChange={(e) =>
                                  handleEditChange(e, "categoria_id")
                                }
                              >
                                {categorias.map((categoria) => (
                                  <option
                                    key={categoria.id}
                                    value={categoria.id}
                                  >
                                    {categoria.nome}
                                  </option>
                                ))}
                              </Form.Control>
                            ) : (
                              categorias.find(
                                (cat) => cat.id === transacao.categoria_id
                              )?.nome
                            )}
                          </td>
                          <td>
                            {editingId === transacao.id ? (
                              <Form.Control
                                as="select"
                                value={editedTransaction.conta_id}
                                onChange={(e) =>
                                  handleEditChange(e, "conta_id")
                                }
                              >
                                {contas.map((conta) => (
                                  <option key={conta.id} value={conta.id}>
                                    {conta.nome}
                                  </option>
                                ))}
                              </Form.Control>
                            ) : (
                              contas.find(
                                (conta) => conta.id === transacao.conta_id
                              )?.nome
                            )}
                          </td>
                          <td
                            className={
                              transacao.tipo === "receita"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {editingId === transacao.id ? (
                              <Form.Control
                                type="number"
                                value={editedTransaction.valor}
                                onChange={(e) => handleEditChange(e, "valor")}
                              />
                            ) : (
                              `R$ ${Math.abs(transacao.valor).toFixed(2)}`
                            )}
                          </td>
                          <td>
                            {editingId === transacao.id ? (
                              <ResponsiveButton
                                variant="success"
                                size="sm"
                                onClick={handleSaveEdit}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </ResponsiveButton>
                            ) : (
                              <ResponsiveButton
                                variant="outline-primary"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleEdit(transacao)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </ResponsiveButton>
                            )}
                            <ResponsiveButton
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(transacao.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </ResponsiveButton>
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
