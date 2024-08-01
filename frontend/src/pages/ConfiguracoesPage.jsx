import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPalette,
  faBell,
  faEye,
  faLock,
  faLanguage,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Layout from '../layout/Layout';
import axios from 'axios';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
  margin-bottom: 20px;
`;

const ConfiguracoesPage = () => {
  const [configuracoes, setConfiguracoes] = useState({
    tema: 'claro',
    notificacoes: {
      email: true,
      push: false,
      sms: false
    },
    idioma: 'pt-BR'
  });
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    fetchConfiguracoes();
  }, []);

  const fetchConfiguracoes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/configuracoes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfiguracoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setConfiguracoes(prev => ({
        ...prev,
        notificacoes: {
          ...prev.notificacoes,
          [name]: checked
        }
      }));
    } else {
      setConfiguracoes(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleConfirmarSenhaChange = (e) => {
    setConfirmarSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/configuracoes', configuracoes, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlertMessage('Configurações salvas com sucesso!');
      setAlertVariant('success');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage('Erro ao salvar configurações. Tente novamente.');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  };

  return (
    <Layout>
      <Container>
        <h1 className="my-4">Configurações</h1>
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <StyledCard>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faPalette} className="mr-2" /> Aparência</Card.Title>
              <Form.Group>
                <Form.Label>Tema</Form.Label>
                <Form.Control 
                  as="select" 
                  name="tema"
                  value={configuracoes.tema}
                  onChange={handleInputChange}
                >
                  <option value="claro">Claro</option>
                  <option value="escuro">Escuro</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faBell} className="mr-2" /> Notificações</Card.Title>
              <Form.Group>
                <Form.Check 
                  type="checkbox" 
                  label="Receber notificações por e-mail" 
                  name="email"
                  checked={configuracoes.notificacoes.email}
                  onChange={handleInputChange}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Receber notificações push" 
                  name="push"
                  checked={configuracoes.notificacoes.push}
                  onChange={handleInputChange}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Receber notificações por SMS" 
                  name="sms"
                  checked={configuracoes.notificacoes.sms}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faLanguage} className="mr-2" /> Idioma</Card.Title>
              <Form.Group>
                <Form.Control 
                  as="select" 
                  name="idioma"
                  value={configuracoes.idioma}
                  onChange={handleInputChange}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </StyledCard>

          <Button variant="primary" type="submit" className="mb-4">
            <FontAwesomeIcon icon={faSave} className="mr-2" /> Salvar Configurações
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default ConfiguracoesPage;
