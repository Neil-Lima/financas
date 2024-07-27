import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Pagination,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Layout from '../layout/Layout';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const historicoData = [
  {
    id: 1,
    data: "2023-09-01",
    descricao: "Depósito de salário",
    valor: 5000.0,
    tipo: "Receita",
    categoria: "Salário",
  },
  {
    id: 2,
    data: "2023-09-02",
    descricao: "Pagamento de aluguel",
    valor: -1500.0,
    tipo: "Despesa",
    categoria: "Moradia",
  },
  {
    id: 3,
    data: "2023-09-03",
    descricao: "Compra de supermercado",
    valor: -300.0,
    tipo: "Despesa",
    categoria: "Alimentação",
  },
  {
    id: 4,
    data: "2023-09-04",
    descricao: "Venda de item usado",
    valor: 200.0,
    tipo: "Receita",
    categoria: "Vendas",
  },
  {
    id: 5,
    data: "2023-09-05",
    descricao: "Pagamento de conta de luz",
    valor: -150.0,
    tipo: "Despesa",
    categoria: "Utilidades",
  },
];

const chartData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
  datasets: [
    {
      label: "Receitas",
      data: [4000, 4200, 4100, 4300, 4000, 4500, 4800, 4600, 5000],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
    {
      label: "Despesas",
      data: [3000, 3200, 2800, 3100, 2900, 3300, 3400, 3200, 3500],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const HistoricoPage = () => {
  const [filtro, setFiltro] = useState({
    dataInicio: "",
    dataFim: "",
    tipo: "todos",
    categoria: "",
    valorMinimo: "",
    valorMaximo: "",
  });
  const [dadosFiltrados, setDadosFiltrados] = useState(historicoData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltro((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = historicoData.filter((item) => {
      const dataItem = new Date(item.data);
      const dataInicio = filtro.dataInicio ? new Date(filtro.dataInicio) : null;
      const dataFim = filtro.dataFim ? new Date(filtro.dataFim) : null;
      
      return (
        (!dataInicio || dataItem >= dataInicio) &&
        (!dataFim || dataItem <= dataFim) &&
        (filtro.tipo === "todos" || item.tipo.toLowerCase() === filtro.tipo) &&
        (!filtro.categoria || item.categoria === filtro.categoria) &&
        (!filtro.valorMinimo || item.valor >= parseFloat(filtro.valorMinimo)) &&
        (!filtro.valorMaximo || item.valor <= parseFloat(filtro.valorMaximo))
      );
    });
    setDadosFiltrados(filtered);
  };

  const exportarCSV = () => {
    const csvData = dadosFiltrados.map(item => ({
      Data: item.data,
      Descrição: item.descricao,
      Valor: item.valor,
      Tipo: item.tipo,
      Categoria: item.categoria,
    }));
    return csvData;
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Histórico Financeiro", 14, 15);
    doc.autoTable({
      head: [["Data", "Descrição", "Valor", "Tipo", "Categoria"]],
      body: dadosFiltrados.map(item => [
        item.data,
        item.descricao,
        item.valor.toFixed(2),
        item.tipo,
        item.categoria,
      ]),
    });
    doc.save("historico_financeiro.pdf");
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Histórico Financeiro</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                      <Form.Label>Data Início</Form.Label>
                        <Form.Control
                          type="date"
                          name="dataInicio"
                          value={filtro.dataInicio}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Data Fim</Form.Label>
                        <Form.Control
                          type="date"
                          name="dataFim"
                          value={filtro.dataFim}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control
                          as="select"
                          name="tipo"
                          value={filtro.tipo}
                          onChange={handleInputChange}
                        >
                          <option value="todos">Todos</option>
                          <option value="receita">Receita</option>
                          <option value="despesa">Despesa</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                          type="text"
                          name="categoria"
                          value={filtro.categoria}
                          onChange={handleInputChange}
                          placeholder="Categoria"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Valor Mínimo</Form.Label>
                        <Form.Control
                          type="number"
                          name="valorMinimo"
                          value={filtro.valorMinimo}
                          onChange={handleInputChange}
                          placeholder="Valor Mínimo"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>Valor Máximo</Form.Label>
                        <Form.Control
                          type="number"
                          name="valorMaximo"
                          value={filtro.valorMaximo}
                          onChange={handleInputChange}
                          placeholder="Valor Máximo"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                      >
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />{" "}
                        Filtrar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Gráfico de Receitas e Despesas</Card.Title>
                <ChartContainer>
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
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
                <Card.Title className="d-flex justify-content-between align-items-center">
                  Histórico de Transações
                  <div>
                    <CSVLink
                      data={exportarCSV()}
                      filename={"historico_financeiro.csv"}
                      className="btn btn-success mr-2"
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Exportar CSV
                    </CSVLink>
                    <Button variant="info" onClick={exportarPDF}>
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Exportar PDF
                    </Button>
                  </div>
                </Card.Title>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Valor</th>
                      <th>Tipo</th>
                      <th>Categoria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosFiltrados.map((item) => (
                      <tr key={item.id}>
                        <td>{item.data}</td>
                        <td>{item.descricao}</td>
                        <td
                          className={
                            item.valor >= 0 ? "text-success" : "text-danger"
                          }
                        >
                          R$ {Math.abs(item.valor).toFixed(2)}
                        </td>
                        <td>{item.tipo}</td>
                        <td>{item.categoria}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="mt-3 justify-content-center">
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default HistoricoPage;
