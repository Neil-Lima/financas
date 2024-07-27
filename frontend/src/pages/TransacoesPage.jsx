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

const transactionData = [
  { id: 1, date: "2023-09-01", description: "Supermercado", amount: -150.0, category: "Alimentação" },
  { id: 2, date: "2023-09-02", description: "Salário", amount: 4000.0, category: "Renda" },
  { id: 3, date: "2023-09-03", description: "Conta de Luz", amount: -80.0, category: "Moradia" },
  { id: 4, date: "2023-09-04", description: "Restaurante", amount: -60.0, category: "Alimentação" },
  { id: 5, date: "2023-09-05", description: "Transferência", amount: -200.0, category: "Transferência" },
];

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

const TransacoesPage = () => {
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
  });
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recognizedCategory = recognizeCategory(newTransaction.description);
    const transactionWithCategory = {
      ...newTransaction,
      category: recognizedCategory,
    };
    console.log("Nova transação:", transactionWithCategory);
    setNewTransaction({ date: "", description: "", amount: "", category: "" });
  };

  const recognizeCategory = (description) => {
    const lowerDescription = description.toLowerCase();
    if (lowerDescription.includes("mercado") || lowerDescription.includes("supermercado"))
      return "Alimentação";
    if (lowerDescription.includes("salário") || lowerDescription.includes("pagamento"))
      return "Renda";
    if (lowerDescription.includes("luz") || lowerDescription.includes("água") || lowerDescription.includes("aluguel"))
      return "Moradia";
    if (lowerDescription.includes("restaurante") || lowerDescription.includes("lanchonete"))
      return "Alimentação";
    if (lowerDescription.includes("transferência") || lowerDescription.includes("pix"))
      return "Transferência";
    return "Outros";
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (importFile) {
      console.log("Arquivo importado:", importFile);
      setShowImportModal(false);
    }
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
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={newTransaction.date}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                          type="text"
                          name="description"
                          value={newTransaction.description}
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
                          name="amount"
                          value={newTransaction.amount}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                          as="select"
                          name="category"
                          value={newTransaction.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Alimentação">Alimentação</option>
                          <option value="Moradia">Moradia</option>
                          <option value="Transporte">Transporte</option>
                          <option value="Lazer">Lazer</option>
                          <option value="Saúde">Saúde</option>
                          <option value="Educação">Educação</option>
                          <option value="Renda">Renda</option>
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
                    {transactionData.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.category}</td>
                        <td className={transaction.amount >= 0 ? "text-success" : "text-danger"}>
                          R$ {Math.abs(transaction.amount).toFixed(2)}
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="outline-danger" size="sm">
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
