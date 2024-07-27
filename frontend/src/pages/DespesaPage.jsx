import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Layout from '../layout/Layout';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

const DespesaPage = () => {
  const [despesas, setDespesas] = useState([
    { id: 1, descricao: 'Aluguel', valor: 1500, data: '2023-09-01', categoria: 'Moradia' },
    { id: 2, descricao: 'Supermercado', valor: 800, data: '2023-09-05', categoria: 'Alimentação' },
    { id: 3, descricao: 'Energia Elétrica', valor: 200, data: '2023-09-10', categoria: 'Utilidades' },
    { id: 4, descricao: 'Internet', valor: 100, data: '2023-09-15', categoria: 'Utilidades' },
    { id: 5, descricao: 'Transporte', valor: 300, data: '2023-09-20', categoria: 'Transporte' },
  ]);
  const [novaDespesa, setNovaDespesa] = useState({ descricao: '', valor: '', data: '', categoria: '' });

  const handleNovaDespesaChange = (e) => {
    setNovaDespesa({ ...novaDespesa, [e.target.name]: e.target.value });
  };

  const adicionarDespesa = (e) => {
    e.preventDefault();
    setDespesas([...despesas, { ...novaDespesa, id: despesas.length + 1, valor: parseFloat(novaDespesa.valor) }]);
    setNovaDespesa({ descricao: '', valor: '', data: '', categoria: '' });
  };

  const previsaoDespesas = () => {
    const hoje = new Date();
    const proximosMeses = Array.from({length: 6}, (_, i) => {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);
      return data.toLocaleString('default', { month: 'short' });
    });

    const valoresPrevistosAleatorios = Array.from({length: 6}, () => 
      Math.floor(Math.random() * (3500 - 2500 + 1) + 2500)
    );

    return {
      labels: proximosMeses,
      datasets: [
        {
          label: 'Despesas Previstas',
          data: valoresPrevistosAleatorios,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  };

  return (
    <Layout>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2>Despesas</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Nova Despesa</Card.Title>
                <Form onSubmit={adicionarDespesa}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="descricao"
                          value={novaDespesa.descricao}
                          onChange={handleNovaDespesaChange}
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
                          value={novaDespesa.valor}
                          onChange={handleNovaDespesaChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Data</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="data"
                          value={novaDespesa.data}
                          onChange={handleNovaDespesaChange}
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
                          value={novaDespesa.categoria}
                          onChange={handleNovaDespesaChange}
                          required
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="Moradia">Moradia</option>
                          <option value="Alimentação">Alimentação</option>
                          <option value="Transporte">Transporte</option>
                          <option value="Utilidades">Utilidades</option>
                          <option value="Lazer">Lazer</option>
                          <option value="Saúde">Saúde</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Despesa
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
                <Card.Title>Previsão de Despesas Futuras</Card.Title>
                <ChartContainer>
                  <Line 
                    data={previsaoDespesas()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Valor (R$)'
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Mês'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Previsão de Despesas para os Próximos 6 Meses'
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
            <Card.Title>Lista de Despesas</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map((despesa) => (
                  <tr key={despesa.id}>
                    <td>{despesa.descricao}</td>
                    <td>R$ {despesa.valor.toFixed(2)}</td>
                    <td>{despesa.data}</td>
                    <td>{despesa.categoria}</td>
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
      </Container>
    </Layout>
  );
};

export default DespesaPage;
