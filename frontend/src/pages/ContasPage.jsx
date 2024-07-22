import React, { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const contas = [
    { nome: 'Conta Corrente', banco: 'Banco XYZ', saldo: 5000 },
    { nome: 'Poupança', banco: 'Banco ABC', saldo: 10000 },
    { nome: 'Cartão de Crédito', banco: 'Banco DEF', saldo: -1500 },
  ];

  return (
    <Layout>   
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Contas</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm" onClick={handleShowModal}>
            <FaPlus /> Nova Conta
          </Button>
        </div>
      </div>
      <Row xs={1} md={3} className="g-4">
        {contas.map((conta, idx) => (
          <Col key={idx}>
            <StyledCard className="h-100">
              <Card.Body>
                <Card.Title>{conta.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{conta.banco}</Card.Subtitle>
                <Card.Text>
                  Saldo: R$ {conta.saldo.toFixed(2)}
                </Card.Text>
                <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /> Editar</Button>
                <Button variant="outline-danger" size="sm"><FaTrash /> Excluir</Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Conta</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Conta</Form.Label>
              <Form.Select required>
                <option value="">Selecione um tipo</option>
                <option>Conta Corrente</option>
                <option>Poupança</option>
                <option>Cartão de Crédito</option>
                <option>Investimento</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Saldo Inicial</Form.Label>
              <Form.Control type="number" step="0.01" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Banco</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleCloseModal}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default ContasPage;
