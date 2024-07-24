import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Layout from '../layout/Layout';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
`;

function ContasPage() {
  const [contas, setContas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nome: '', tipo: '', saldoInicial: 0, banco: '' });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de criação de conta local, sem comunicação com o backend
  };

  const handleDelete = (id) => {
    // Aqui você pode adicionar a lógica de exclusão de conta local, sem comunicação com o backend
  };

  return (
    <Layout>   
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Contas</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm" onClick={handleShow}>
            <FaPlus /> Nova Conta
          </Button>
        </div>
      </div>
      <Row xs={1} md={3} className="g-4">
        {contas.map((conta) => (
          <Col key={conta.id}>
            <StyledCard className="h-100">
              <Card.Body>
                <Card.Title>{conta.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{conta.banco}</Card.Subtitle>
                <Card.Text>
                  Saldo: R$ {conta.saldo.toFixed(2)}
                </Card.Text>
                <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /> Editar</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(conta.id)}><FaTrash /> Excluir</Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Conta</Form.Label>
              <Form.Control type="text" name="nome" onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Conta</Form.Label>
              <Form.Select name="tipo" onChange={handleInputChange} required>
                <option value="">Selecione um tipo</option>
                <option value="CONTA_CORRENTE">Conta Corrente</option>
                <option value="POUPANCA">Poupança</option>
                <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                <option value="INVESTIMENTO">Investimento</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Saldo Inicial</Form.Label>
              <Form.Control type="number" step="0.01" name="saldoInicial" onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Banco</Form.Label>
              <Form.Control type="text" name="banco" onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Salvar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default ContasPage;
