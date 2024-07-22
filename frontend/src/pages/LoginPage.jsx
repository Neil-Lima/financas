import React, { useState } from 'react';
import { Form, Button, Card, Modal, Container } from 'react-bootstrap';
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
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username: email, password: senha });
      localStorage.setItem('token', response.data.access_token);
      navigate('/home');
    } catch (error) {
      console.error('Erro no login', error);
    }
  };

  const handleRegistro = async () => {
    try {
      await axios.post('http://localhost:3001/auth/register', { username: email, password: senha, nome, sobrenome });
      setShowModal(false);
      // Opcional: fazer login automaticamente após o registro
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
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
