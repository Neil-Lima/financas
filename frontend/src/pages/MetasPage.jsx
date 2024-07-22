import React, { useState } from 'react';
import { Row, Col, Button, Card, Modal, Form, ProgressBar } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Layout from '../layout/Layout';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
`;

function MetasPage() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Metas Financeiras</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm" onClick={handleShow}>
            <FaPlus /> Nova Meta
          </Button>
        </div>
      </div>

      <Row xs={1} md={2} className="g-4">
        {['Fundo de Emergência', 'Viagem de Férias', 'Novo Carro'].map((meta, idx) => (
          <Col key={idx}>
            <StyledCard>
              <Card.Body>
                <Card.Title>{meta}</Card.Title>
                <Card.Text>Meta: R$ {(idx + 1) * 5000},00</Card.Text>
                <Card.Text>Progresso: R$ {(idx + 1) * 2000},00 ({(idx + 1) * 20}%)</Card.Text>
                <ProgressBar now={(idx + 1) * 20} className="mb-3" />
                <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /> Editar</Button>
                <Button variant="outline-danger" size="sm"><FaTrash /> Excluir</Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Meta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Meta</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor da Meta</Form.Label>
              <Form.Control type="number" step="0.01" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data Limite</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleClose}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default MetasPage;
