import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Layout from '../layout/Layout';
import axios from 'axios';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const OrcamentosPage = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [newOrcamento, setNewOrcamento] = useState({
    categoria_id: '',
    valor_planejado: '',
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear()
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchOrcamentos();
    fetchCategorias();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/orcamentos?mes=${newOrcamento.mes}&ano=${newOrcamento.ano}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrcamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
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
    setNewOrcamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/orcamentos', newOrcamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewOrcamento({
        categoria_id: '',
        valor_planejado: '',
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear()
      });
      fetchOrcamentos();
    } catch (error) {
      console.error('Erro ao adicionar orçamento:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/orcamentos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrcamentos();
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
    }
  };

  useEffect(() => {
    const newAlerts = orcamentos.filter(orcamento => orcamento.valor_atual > orcamento.valor_planejado)
      .map(orcamento => `${categorias.find(cat => cat.id === orcamento.categoria_id)?.nome}: Ultrapassou o limite em R$ ${(orcamento.valor_atual - orcamento.valor_planejado).toFixed(2)}`);
    setAlerts(newAlerts);
  }, [orcamentos, categorias]);

  const chartData = {
    labels: orcamentos.map(orcamento => categorias.find(cat => cat.id === orcamento.categoria_id)?.nome),
    datasets: [
      {
        label: 'Planejado',
        data: orcamentos.map(orcamento => orcamento.valor_planejado),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Atual',
        data: orcamentos.map(orcamento => orcamento.valor_atual),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Orçamentos</h2>
          </Col>
        </Row>

        {alerts.length > 0 && (
          <Row className="mb-4">
            <Col>
              <Alert variant="warning">
                <Alert.Heading>Alertas de Ultrapassagem de Limites:</Alert.Heading>
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
            <StyledCard>
              <Card.Body>
                <Card.Title>Novo Orçamento</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control 
                          as="select" 
                          name="categoria_id" 
                          value={newOrcamento.categoria_id} 
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
                    <Col md={3}>
                      <Form.Group>
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
                    <Col md={3}>
                      <Form.Group>
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
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Orçamento
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
                <Card.Title>Visão Geral de Orçamentos</Card.Title>
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
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Orçamento Planejado vs Atual'
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
                <Card.Title>Lista de Orçamentos</Card.Title>
                <Table striped hover>
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
                        <td>{categorias.find(cat => cat.id === orcamento.categoria_id)?.nome}</td>
                        <td>R$ {orcamento.valor_planejado.toFixed(2)}</td>
                        <td>R$ {orcamento.valor_atual.toFixed(2)}</td>
                        <td>R$ {(orcamento.valor_planejado - orcamento.valor_atual).toFixed(2)}</td>
                        <td>
                          <div className="progress">
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{
                                width: `${(orcamento.valor_atual / orcamento.valor_planejado) * 100}%`,
                                backgroundColor: orcamento.valor_atual > orcamento.valor_planejado ? 'red' : 'green'
                              }}
                              aria-valuenow={(orcamento.valor_atual / orcamento.valor_planejado) * 100}
                              aria-valuemin="0" 
                              aria-valuemax="100"
                            >
                              {((orcamento.valor_atual / orcamento.valor_planejado) * 100).toFixed(0)}%
                            </div>
                          </div>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(orcamento.id)}>
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
      </Container>
    </Layout>
  );
};

export default OrcamentosPage;
