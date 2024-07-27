import React, { useState } from 'react';
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

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
  margin-bottom: 20px;
`;

const ConfiguracoesPage = () => {
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [exibicaoDados, setExibicaoDados] = useState({
    saldoOculto: false,
    mostrarGraficos: true,
    moedaPadrao: 'BRL'
  });
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [idioma, setIdioma] = useState('pt-BR');
  const [showAlert, setShowAlert] = useState(false);

  const handleNotificacaoChange = (e) => {
    setNotificacoes({
      ...notificacoes,
      [e.target.name]: e.target.checked
    });
  };

  const handleExibicaoDadosChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setExibicaoDados({
      ...exibicaoDados,
      [e.target.name]: value
    });
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleConfirmarSenhaChange = (e) => {
    setConfirmarSenha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Configurações salvas:', { notificacoes, exibicaoDados, idioma });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Layout>
      <Container>
        <h1 className="my-4">Configurações</h1>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Configurações salvas com sucesso!
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <StyledCard>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faBell} className="mr-2" /> Notificações</Card.Title>
              <Form.Group>
                <Form.Check 
                  type="checkbox" 
                  label="Receber notificações por e-mail" 
                  name="email"
                  checked={notificacoes.email}
                  onChange={handleNotificacaoChange}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Receber notificações push" 
                  name="push"
                  checked={notificacoes.push}
                  onChange={handleNotificacaoChange}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Receber notificações por SMS" 
                  name="sms"
                  checked={notificacoes.sms}
                  onChange={handleNotificacaoChange}
                />
              </Form.Group>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faEye} className="mr-2" /> Exibição de Dados</Card.Title>
              <Form.Group>
                <Form.Check 
                  type="checkbox" 
                  label="Ocultar saldo" 
                  name="saldoOculto"
                  checked={exibicaoDados.saldoOculto}
                  onChange={handleExibicaoDadosChange}
                />
                <Form.Check 
                  type="checkbox" 
                  label="Mostrar gráficos" 
                  name="mostrarGraficos"
                  checked={exibicaoDados.mostrarGraficos}
                  onChange={handleExibicaoDadosChange}
                />
                <Form.Label>Moeda Padrão</Form.Label>
                <Form.Control 
                  as="select" 
                  name="moedaPadrao"
                  value={exibicaoDados.moedaPadrao}
                  onChange={handleExibicaoDadosChange}
                >
                  <option value="BRL">Real (BRL)</option>
                  <option value="USD">Dólar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faLock} className="mr-2" /> Segurança</Card.Title>
              <Form.Group>
                <Form.Label>Nova Senha</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Digite a nova senha" 
                  value={senha}
                  onChange={handleSenhaChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirmar Nova Senha</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Confirme a nova senha" 
                  value={confirmarSenha}
                  onChange={handleConfirmarSenhaChange}
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
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
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
