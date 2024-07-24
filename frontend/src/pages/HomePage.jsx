import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Table } from 'react-bootstrap';
import { FaCalendar } from 'react-icons/fa';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Layout from '../layout/Layout';

ChartJS.register(ArcElement, Tooltip, Legend);

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

function HomePage() {
  const [userName, setUserName] = useState('');
  const [contas, setContas] = useState([]);
  const [metas, setMetas] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [relatorios, setRelatorios] = useState(null);

  const chartData = {
    labels: Array.isArray(orcamentos) ? orcamentos.map(orcamento => orcamento.categoria) : [],
    datasets: [{
      data: Array.isArray(orcamentos) ? orcamentos.map(orcamento => orcamento.planejado) : [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ]
    }]
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Dashboard</h1>
        <h2>Bem-vindo, {userName}!</h2>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="outline-secondary" size="sm" className="me-2">Compartilhar</Button>
          <Button variant="outline-secondary" size="sm" className="me-2">Exportar</Button>
          <Button variant="outline-secondary" size="sm">
            <FaCalendar className="me-1" />
            Esta semana
          </Button>
        </div>
      </div>

      <Row>
        <Col md={4} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Saldo Total</Card.Title>
              <Card.Text as="h2" className="text-primary">
                R$ {relatorios?.saldo.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={4} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Receitas do Mês</Card.Title>
              <Card.Text as="h2" className="text-success">
                R$ {relatorios?.totalReceitas.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={4} className="mb-4">
          <StyledCard>
            <Card.Body>
              <Card.Title>Despesas do Mês</Card.Title>
              <Card.Text as="h2" className="text-danger">
                R$ {relatorios?.totalDespesas.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>

      <h2>Gastos por Categoria</h2>
      <div style={{ height: '40vh', width: '100%' }}>
        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <h2 className="mt-5">Últimas Transações</h2>
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
          {Array.isArray(transacoes) && transacoes.slice(0, 5).map((transacao, index) => (
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
    </Layout>
  );
}

export default HomePage;
