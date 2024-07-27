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
  const [metas, setMetas] = useState([
    { id: 1, description: 'Comprar um carro', targetAmount: 30000, currentAmount: 15000, deadline: '2024-12-31', achieved: false },
    { id: 2, description: 'Viagem para Europa', targetAmount: 15000, currentAmount: 15000, deadline: '2024-06-30', achieved: true },
    { id: 3, description: 'Fundo de emergência', targetAmount: 20000, currentAmount: 10000, deadline: '2023-12-31', achieved: false },
  ]);
  const [newMeta, setNewMeta] = useState({ description: '', targetAmount: '', deadline: '' });
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [currentReward, setCurrentReward] = useState('');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestedGoal, setSuggestedGoal] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeta(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      id: metas.length + 1,
      ...newMeta,
      currentAmount: 0,
      achieved: false
    };
    setMetas([...metas, newGoal]);
    setNewMeta({ description: '', targetAmount: '', deadline: '' });
  };

  const checkGoalAchievement = (goal) => {
    if (goal.currentAmount >= goal.targetAmount && !goal.achieved) {
      const updatedMetas = metas.map(m => 
        m.id === goal.id ? { ...m, achieved: true } : m
      );
      setMetas(updatedMetas);
      setCurrentReward(getRandomReward());
      setShowRewardModal(true);
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

  const chartData = {
    labels: metas.map(meta => meta.description),
    datasets: [
      {
        label: 'Progresso',
        data: metas.map(meta => (meta.currentAmount / meta.targetAmount) * 100),
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
                          name="description"
                          value={newMeta.description}
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
                          name="targetAmount"
                          value={newMeta.targetAmount}
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
                          name="deadline"
                          value={newMeta.deadline}
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
                <Table striped hover>
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
                        <td>{meta.description}</td>
                        <td>R$ {meta.targetAmount.toFixed(2)}</td>
                        <td>
                          <ProgressBar 
                            now={(meta.currentAmount / meta.targetAmount) * 100} 
                            label={`${((meta.currentAmount / meta.targetAmount) * 100).toFixed(0)}%`}
                          />
                        </td>
                        <td>{meta.deadline}</td>
                        <td>
                          {meta.achieved ? (
                            <Badge variant="success">Concluída</Badge>
                          ) : (
                            <Badge variant="warning">Em andamento</Badge>
                          )}
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="mr-2" onClick={() => checkGoalAchievement(meta)}>
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
              setNewMeta({...newMeta, description: suggestedGoal});
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
