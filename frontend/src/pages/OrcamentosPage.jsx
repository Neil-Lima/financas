import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  Chart as ChartJS,
  ArcElement,
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
  ArcElement,
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

const OrcamentosPage = () => {
  const { isDarkMode } = useTheme();
  const [orcamentos, setOrcamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [newOrcamento, setNewOrcamento] = useState({
    categoria_id: "",
    valor_planejado: "",
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),
  });
  const [alerts, setAlerts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedOrcamento, setEditedOrcamento] = useState({});

  useEffect(() => {
    fetchOrcamentos();
    fetchCategorias();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/orcamentos?mes=${newOrcamento.mes}&ano=${newOrcamento.ano}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrcamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar orçamentos:", error);
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
    setNewOrcamento((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/orcamentos", newOrcamento, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewOrcamento({
        categoria_id: "",
        valor_planejado: "",
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear(),
      });
      fetchOrcamentos();
    } catch (error) {
      console.error("Erro ao adicionar orçamento:", error);
    }
  };

  const handleEdit = (orcamento) => {
    setEditingId(orcamento.id);
    setEditedOrcamento(orcamento);
  };

  const handleEditChange = (e, field) => {
    setEditedOrcamento({ ...editedOrcamento, [field]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orcamentos/${editingId}`,
        editedOrcamento,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingId(null);
      fetchOrcamentos();
    } catch (error) {
      console.error("Erro ao editar orçamento:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este orçamento?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/orcamentos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchOrcamentos();
      } catch (error) {
        console.error("Erro ao deletar orçamento:", error);
      }
    }
  };

  useEffect(() => {
    const newAlerts = orcamentos
      .filter((orcamento) => orcamento.valor_atual > orcamento.valor_planejado)
      .map(
        (orcamento) =>
          `${
            categorias.find((cat) => cat.id === orcamento.categoria_id)?.nome
          }: Ultrapassou o limite em R$ ${(
            orcamento.valor_atual - orcamento.valor_planejado
          ).toFixed(2)}`
      );
    setAlerts(newAlerts);
  }, [orcamentos, categorias]);

  const chartData = {
    labels: orcamentos.map(
      (orcamento) =>
        categorias.find((cat) => cat.id === orcamento.categoria_id)?.nome
    ),
    datasets: [
      {
        label: "Planejado",
        data: orcamentos.map((orcamento) => orcamento.valor_planejado),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Atual",
        data: orcamentos.map((orcamento) => orcamento.valor_atual),
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
        position: "top",
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      },
      title: {
        display: true,
        text: "Orçamento Planejado vs Atual",
        color: isDarkMode ? "#ffffff" : "#000000",
      },
    },
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2 className="responsive-heading">Orçamentos</h2>
          </Col>
        </Row>

        {alerts.length > 0 && (
          <Row className="mb-4">
            <Col>
              <Alert variant="warning">
                <Alert.Heading>
                  Alertas de Ultrapassagem de Limites:
                </Alert.Heading>
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
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Novo Orçamento</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                          as="select"
                          name="categoria_id"
                          value={newOrcamento.categoria_id}
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
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Valor Planejado</Form.Label>
                        <Form.Control
                          type="number"
                          name="valor_planejado"
                          value={newOrcamento.valor_planejado}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mês</Form.Label>
                        <Form.Control
                          type="number"
                          name="mes"
                          value={newOrcamento.mes}
                          onChange={handleInputChange}
                          min="1"
                          max="12"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control
                          type="number"
                          name="ano"
                          value={newOrcamento.ano}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <ResponsiveButton
                    variant="primary"
                    type="submit"
                    className="mt-3"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Orçamento
                  </ResponsiveButton>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Visão Geral de Orçamentos</Card.Title>
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
                <Card.Title>Lista de Orçamentos</Card.Title>
                <div className="table-responsive">
                  <StyledTable
                    striped
                    hover
                    variant={isDarkMode ? "dark" : "light"}
                    isDarkMode={isDarkMode}
                  >
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th>Planejado</th>
                        <th>Atual</th>
                        <th>Restante</th>
                        <th>Progresso</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orcamentos.map((orcamento) => (
                        <tr key={orcamento.id}>
                          <td>
                            {editingId === orcamento.id ? (
                              <Form.Control
                                as="select"
                                value={editedOrcamento.categoria_id}
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
                                (cat) => cat.id === orcamento.categoria_id
                              )?.nome
                            )}
                          </td>
                          <td>
                            {editingId === orcamento.id ? (
                              <Form.Control
                                type="number"
                                value={editedOrcamento.valor_planejado}
                                onChange={(e) =>
                                  handleEditChange(e, "valor_planejado")
                                }
                              />
                            ) : (
                              `R$ ${orcamento.valor_planejado.toFixed(2)}`
                            )}
                          </td>
                          <td>R$ {orcamento.valor_atual.toFixed(2)}</td>
                          <td>
                            R${" "}
                            {(
                              orcamento.valor_planejado - orcamento.valor_atual
                            ).toFixed(2)}
                          </td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${
                                    (orcamento.valor_atual /
                                      orcamento.valor_planejado) *
                                    100
                                  }%`,
                                  backgroundColor:
                                    orcamento.valor_atual >
                                    orcamento.valor_planejado
                                      ? "red"
                                      : "green",
                                }}
                                aria-valuenow={
                                  (orcamento.valor_atual /
                                    orcamento.valor_planejado) *
                                  100
                                }
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {(
                                  (orcamento.valor_atual /
                                    orcamento.valor_planejado) *
                                  100
                                ).toFixed(0)}
                                %
                              </div>
                            </div>
                          </td>
                          <td>
                            {editingId === orcamento.id ? (
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
                                onClick={() => handleEdit(orcamento)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </ResponsiveButton>
                            )}
                            <ResponsiveButton
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(orcamento.id)}
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
      </Container>
    </Layout>
  );
};

export default OrcamentosPage;
