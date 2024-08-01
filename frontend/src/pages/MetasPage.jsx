import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal, Badge, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faFlag, 
  faTrophy, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
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

const MetasPage = () => {
  const [metas, setMetas] = useState([]);
  const [newMeta, setNewMeta] = useState({ descricao: '', valor_alvo: '', data_limite: '' });
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentReward, setCurrentReward] = useState('');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestedGoal, setSuggestedGoal] = useState('');

  useEffect(() => {
    fetchMetas();
  }, []);

  const fetchMetas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/metas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMetas(response.data);
    } catch (error) {
      console.error('Erro ao buscar metas:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeta(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/metas', newMeta, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewMeta({ descricao: '', valor_alvo: '', data_limite: '' });
      fetchMetas();
    } catch (error) {
      console.error('Erro ao adicionar meta:', error);
    }
  };

  const checkGoalAchievement = async (meta) => {
    if (meta.valor_atual >= meta.valor_alvo && !meta.concluida) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/metas/${meta.id}`, { ...meta, concluida: true }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentReward(getRandomReward());
        setShowRewardModal(true);
        fetchMetas();
      } catch (error) {
        console.error('Erro ao atualizar meta:', error);
      }
    }
  };

  const getRandomReward = () => {
    const rewards = [
      "Troféu de Conquistador",
      "Medalha de Ouro",
      "Emblema de Superação",
      "Certificado de Excelência",
      "Estrela de Realização"
    ];
    return rewards[Math.floor(Math.random() * rewards.length)];
  };

  const suggestNewGoal = () => {
    const suggestions = [
      "Economizar 10% do salário mensalmente",
      "Investir em um curso de aperfeiçoamento profissional",
      "Criar um fundo para aposentadoria",
      "Quitar todas as dívidas em 12 meses",
      "Iniciar um negócio paralelo"
    ];
    setSuggestedGoal(suggestions[Math.floor(Math.random() * suggestions.length)]);
    setShowSuggestionModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/metas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMetas();
    } catch (error) {
      console.error('Erro ao deletar meta:', error);
    }
  };

  const chartData = {
    labels: metas.map(meta => meta.descricao),
    datasets: [
      {
        label: 'Progresso',
        data: metas.map(meta => (meta.valor_atual / meta.valor_alvo) * 100),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Progresso (%)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Progresso das Metas',
      },
    },
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Metas Financeiras</h2>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" onClick={suggestNewGoal}>
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              Sugerir Nova Meta
            </Button>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Nova Meta</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                          type="text"
                          name="descricao"
                          value={newMeta.descricao}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Valor Alvo</Form.Label>
                        <Form.Control
                          type="number"
                          name="valor_alvo"
                          value={newMeta.valor_alvo}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Data Limite</Form.Label>
                        <Form.Control
                          type="date"
                          name="data_limite"
                          value={newMeta.data_limite}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    Adicionar Meta
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
                <Card.Title>Visão Geral de Metas</Card.Title>
                <ChartContainer>
                <Bar data={chartData} options={chartOptions} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row>
          <Col>
            <StyledCard>
              <Card.Body>
                <Card.Title>Lista de Metas</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Valor Alvo</th>
                      <th>Progresso</th>
                      <th>Data Limite</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metas.map((meta) => (
                      <tr key={meta.id}>
                        <td>{meta.descricao}</td>
                        <td>R$ {meta.valor_alvo.toFixed(2)}</td>
                        <td>
                          <ProgressBar 
                            now={(meta.valor_atual / meta.valor_alvo) * 100} 
                            label={`${((meta.valor_atual / meta.valor_alvo) * 100).toFixed(0)}%`}
                          />
                        </td>
                        <td>{meta.data_limite}</td>
                        <td>
                          {meta.concluida ? (
                            <Badge variant="success">Concluída</Badge>
                          ) : (
                            <Badge variant="warning">Em andamento</Badge>
                          )}
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2" onClick={() => checkGoalAchievement(meta)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(meta.id)}>
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

        <Modal show={showRewardModal} onHide={() => setShowRewardModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Parabéns! Meta Alcançada!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <FontAwesomeIcon icon={faTrophy} size="4x" className="text-warning mb-3" />
            <h4>Você ganhou um(a):</h4>
            <h3 className="text-primary">{currentReward}</h3>
            <p>Continue assim e alcance todas as suas metas!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowRewardModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSuggestionModal} onHide={() => setShowSuggestionModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sugestão de Nova Meta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Baseado no seu perfil, que tal tentar esta nova meta?</p>
            <h4 className="text-primary">{suggestedGoal}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSuggestionModal(false)}>
              Ignorar
            </Button>
            <Button variant="primary" onClick={() => {
              setNewMeta({...newMeta, descricao: suggestedGoal});
              setShowSuggestionModal(false);
            }}>
              Adicionar Meta
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
};

export default MetasPage;

