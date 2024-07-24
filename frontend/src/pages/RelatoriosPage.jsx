import React, { useState } from 'react';
import { Row, Col, Button, Card, Form, Table } from 'react-bootstrap';
import { FaFileExport } from 'react-icons/fa';
import styled from 'styled-components';
import Layout from '../layout/Layout';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
`;

const StyledTable = styled(Table)`
  box-shadow: 0 0 15px rgba(0,0,0,.05);
  border-radius: 8px;
  overflow: hidden;
`;

function RelatoriosPage() {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [relatorios, setRelatorios] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de geração de relatórios local, sem comunicação com o backend
  };

  const chartData = {
    labels: relatorios?.transacoes.map(transacao => new Date(transacao.data).toLocaleDateString()),
    datasets: [
      {
        label: 'Receitas',
        data: relatorios?.transacoes.filter(transacao => transacao.valor > 0).map(transacao => transacao.valor),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Despesas',
        data: relatorios?.transacoes.filter(transacao => transacao.valor < 0).map(transacao => Math.abs(transacao.valor)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Relatório de Transações',
      },
    },
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Relatórios</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="outline-secondary" size="sm" className="me-2">
            <FaFileExport className="me-1" />
            Exportar
          </Button>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Data Inicial</Form.Label>
              <Form.Control type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Data Final</Form.Label>
              <Form.Control type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Gerar Relatório</Button>
      </Form>

      {relatorios && (
        <>
          <Row className="mt-4">
            <Col md={4}>
              <StyledCard>
                <Card.Body>
                  <Card.Title>Saldo Total</Card.Title>
                  <Card.Text as="h2" className="text-primary">
                    R$ {relatorios.saldo.toFixed(2)}
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
            <Col md={4}>
              <StyledCard>
                <Card.Body>
                  <Card.Title>Receitas</Card.Title>
                  <Card.Text as="h2" className="text-success">
                    R$ {relatorios.totalReceitas.toFixed(2)}
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
            <Col md={4}>
              <StyledCard>
                <Card.Body>
                  <Card.Title>Despesas</Card.Title>
                  <Card.Text as="h2" className="text-danger">
                    R$ {relatorios.totalDespesas.toFixed(2)}
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>

          <div style={{ height: '40vh', width: '100%' }}>
            <Line data={chartData} options={chartOptions} />
          </div>

          <h2 className="mt-5">Transações</h2>
          <StyledTable striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {relatorios.transacoes.map((transacao, index) => (
                <tr key={index}>
                  <td>{new Date(transacao.data).toLocaleDateString()}</td>
                  <td>{transacao.descricao}</td>
                  <td>{transacao.categoria}</td>
                  <td className={transacao.valor > 0 ? "text-success" : "text-danger"}>
                    R$ {Math.abs(transacao.valor).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </Layout>
  );
}

export default RelatoriosPage;
