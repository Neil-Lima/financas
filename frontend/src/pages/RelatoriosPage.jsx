import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Layout from '../layout/Layout';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

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

const RelatoriosPage = () => {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [relatorios, setRelatorios] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dataInicial') setDataInicial(value);
    if (name === 'dataFinal') setDataFinal(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulando a geração de relatório com dados fictícios
    setRelatorios({
      resumoFinanceiro: {
        saldoTotal: 45000.00,
        receitaTotal: 75000.00,
        despesaTotal: 30000.00,
        lucro: 45000.00,
        economias: 15000.00,
        investimentos: 30000.00
      },
      transacoesPorCategoria: {
        labels: ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Investimentos'],
        datasets: [{
          data: [5000, 10000, 3000, 2000, 4000, 3000, 30000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(0, 204, 102, 0.6)'
          ],
        }]
      },
      receitasDespesasPorMes: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Receitas',
            data: [60000, 62000, 61000, 63000, 64000, 75000],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: 'Despesas',
            data: [25000, 26000, 27000, 28000, 29000, 30000],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
      },
      fluxoCaixa: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Fluxo de Caixa',
          data: [35000, 36000, 34000, 35000, 35000, 45000],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
      },
      metasFinanceiras: [
        { descricao: 'Fundo de Emergência', meta: 50000, atual: 40000, percentual: 80 },
        { descricao: 'Viagem Internacional', meta: 15000, atual: 9000, percentual: 60 },
        { descricao: 'Entrada Apartamento', meta: 100000, atual: 30000, percentual: 30 }
      ],
      investimentos: [
        { tipo: 'Ações', valor: 15000, rendimento: 12.5 },
        { tipo: 'Fundos Imobiliários', valor: 10000, rendimento: 8.2 },
        { tipo: 'Tesouro Direto', valor: 5000, rendimento: 7.5 }
      ],
      despesasRecorrentes: [
        { descricao: 'Aluguel', valor: 2500 },
        { descricao: 'Energia Elétrica', valor: 300 },
        { descricao: 'Internet', valor: 150 },
        { descricao: 'Plano de Saúde', valor: 800 }
      ],
      indicadoresFinanceiros: {
        taxaPoupanca: 20,
        indiceSaudeFin: 85,
        relacaoReceitaDespesa: 2.5
      }
    });
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Relatórios Financeiros</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Gerar Relatório</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label>Data Inicial</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="dataInicial" 
                          value={dataInicial} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group>
                        <Form.Label>Data Final</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="dataFinal" 
                          value={dataFinal} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button variant="primary" type="submit" className="w-100">
                        <FontAwesomeIcon icon={faSearch} className="mr-2" /> Gerar Relatório
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        {relatorios && (
          <>
            <Row className="mb-4">
              <Col md={4}>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Saldo Total</Card.Title>
                    <h3 className="text-primary">R$ {relatorios.resumoFinanceiro.saldoTotal.toFixed(2)}</h3>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Receita Total</Card.Title>
                    <h3 className="text-success">R$ {relatorios.resumoFinanceiro.receitaTotal.toFixed(2)}</h3>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Despesa Total</Card.Title>
                    <h3 className="text-danger">R$ {relatorios.resumoFinanceiro.despesaTotal.toFixed(2)}</h3>
                  </Card.Body>
                </StyledCard>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Transações por Categoria</Card.Title>
                    <ChartContainer>
                      <Pie data={relatorios.transacoesPorCategoria} options={{ responsive: true, maintainAspectRatio: false }} />
                    </ChartContainer>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={6}>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Receitas vs Despesas</Card.Title>
                    <ChartContainer>
                      <Bar 
                        data={relatorios.receitasDespesasPorMes} 
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

            <Row className="mb-4">
              <Col>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Fluxo de Caixa</Card.Title>
                    <ChartContainer>
                      <Line 
                        data={relatorios.fluxoCaixa} 
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

            <Row className="mb-4">
              <Col>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Metas Financeiras</Card.Title>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Descrição</th>
                          <th>Meta</th>
                          <th>Atual</th>
                          <th>Progresso</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatorios.metasFinanceiras.map((meta, index) => (
                          <tr key={index}>
                            <td>{meta.descricao}</td>
                            <td>R$ {meta.meta.toFixed(2)}</td>
                            <td>R$ {meta.atual.toFixed(2)}</td>
                            <td>
                              <ProgressBar now={meta.percentual} label={`${meta.percentual}%`} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </StyledCard>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Investimentos</Card.Title>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Tipo</th>
                          <th>Valor</th>
                          <th>Rendimento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatorios.investimentos.map((investimento, index) => (
                          <tr key={index}>
                            <td>{investimento.tipo}</td>
                            <td>R$ {investimento.valor.toFixed(2)}</td>
                            <td>{investimento.rendimento}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={6}>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Despesas Recorrentes</Card.Title>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Descrição</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatorios.despesasRecorrentes.map((despesa, index) => (
                          <tr key={index}>
                            <td>{despesa.descricao}</td>
                            <td>R$ {despesa.valor.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </StyledCard>
              </Col>
            </Row>

            <Row>
              <Col>
                <StyledCard>
                  <Card.Body>
                    <Card.Title>Indicadores Financeiros</Card.Title>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Taxa de Poupança</td>
                          <td>{relatorios.indicadoresFinanceiros.taxaPoupanca}%</td>
                        </tr>
                        <tr>
                          <td>Índice de Saúde Financeira</td>
                          <td>{relatorios.indicadoresFinanceiros.indiceSaudeFin}/100</td>
                        </tr>
                        <tr>
                          <td>Relação Receita/Despesa</td>
                          <td>{relatorios.indicadoresFinanceiros.relacaoReceitaDespesa}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </StyledCard>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default RelatoriosPage;
