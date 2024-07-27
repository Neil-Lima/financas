import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Layout from '../layout/Layout';

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileImage = styled(Image)`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const PerfilPage = () => {
  const [perfil, setPerfil] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123 - São Paulo, SP',
    dataNascimento: '1990-01-01',
    profissao: 'Engenheiro de Software'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Perfil atualizado:', perfil);
    // Aqui você implementaria a lógica para salvar as alterações do perfil
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h2>Perfil do Usuário</h2>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <StyledCard>
              <Card.Body className="text-center">
                <ProfileImage src="https://via.placeholder.com/150" roundedCircle />
                <h3>{perfil.nome}</h3>
                <p>{perfil.profissao}</p>
                <Button variant="outline-primary">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Editar Foto
                </Button>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={8}>
            <StyledCard>
              <Card.Body>
                <h4 className="mb-4">Informações Pessoais</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nome Completo</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="nome" 
                          value={perfil.nome} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={perfil.email} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="telefone" 
                          value={perfil.telefone} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="endereco" 
                          value={perfil.endereco} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="dataNascimento" 
                          value={perfil.dataNascimento} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Profissão</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="profissao" 
                          value={perfil.profissao} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
                    Salvar Alterações
                  </Button>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PerfilPage;
