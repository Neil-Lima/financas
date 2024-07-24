import React, { useState } from 'react';
import { Form, Button, Card, Modal, Container, Alert } from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus, FaSun, FaMoon } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from '../context/contextTheme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userName', response.data.username);
      navigate('/home');
    } catch (error) {
      console.error('Erro no login', error);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  const handleRegistro = async () => {
    try {
      await axios.post('http://localhost:3001/auth/register', { username, email, password });
      setShowModal(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Erro no registro', error);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <ThemeToggle onClick={toggleTheme}>
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </ThemeToggle>
      <StyledCard className="p-4" style={{width: '400px'}}>
        <Card.Title className="text-center mb-4">Login</Card.Title>
        {showSuccessMessage && (
          <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
            Usuário cadastrado com sucesso!
          </Alert>
        )}
        {showErrorMessage && (
          <Alert variant="danger" onClose={() => setShowErrorMessage(false)} dismissible>
            Usuário não cadastrado ou senha incorreta.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-3">
            <FaSignInAlt className="me-2" /> Entrar
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(true)} className="w-100">
            <FaUserPlus className="me-2" /> Registrar
          </Button>
        </Form>
      </StyledCard>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome de Usuário</Form.Label>
              <Form.Control type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleRegistro}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginPage;
