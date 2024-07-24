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

function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    categoria: '',
    planejado: '',
    realizado: '',
    descricao: ''
  });
  const [editingOrcamentoId, setEditingOrcamentoId] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setFormData({ categoria: '', planejado: '', realizado: '', descricao: '' });
    setEditingOrcamentoId(null);
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de criação/edição de orçamento local, sem comunicação com o backend
  };

  const handleEdit = (orcamento) => {
    setFormData({
      categoria: orcamento.categoria,
      planejado: orcamento.planejado.toString(),
      realizado: orcamento.realizado.toString(),
      descricao: orcamento.descricao
    });
    setEditingOrcamentoId(orcamento.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // Aqui você pode adicionar a lógica de exclusão de orçamento local, sem comunicação com o backend
  };

  const formatarValor = (valor) => {
    if (typeof valor === 'number') {
      return valor.toFixed(2);
    }
    return '0.00';
  };

  const calcularProgresso = (realizado, planejado) => {
    if (typeof realizado === 'number' && typeof planejado === 'number' && planejado !== 0) {
      return ((realizado / planejado) * 100).toFixed(0);
    }
    return '0';
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Orçamentos</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm" onClick={handleShow}>
            <FaPlus /> Novo Orçamento
          </Button>
        </div>
      </div>

      <Row xs={1} md={2} className="g-4">
        {orcamentos.map((orcamento) => (
          <Col key={orcamento.id}>
            <StyledCard>
              <Card.Body>
                <Card.Title>{orcamento.categoria}</Card.Title>
                <Card.Text>Planejado: R$ {formatarValor(orcamento.planejado)}</Card.Text>
                <Card.Text>Realizado: R$ {formatarValor(orcamento.realizado)}</Card.Text>
                <ProgressBar now={calcularProgresso(orcamento.realizado, orcamento.planejado)} className="mb-3" />
                <Card.Text>{orcamento.descricao}</Card.Text>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(orcamento)}><FaEdit /> Editar</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(orcamento.id)}><FaTrash /> Excluir</Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingOrcamentoId ? 'Editar Orçamento' : 'Novo Orçamento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor Planejado</Form.Label>
              <Form.Control type="number" step="0.01" name="planejado" value={formData.planejado} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor Realizado</Form.Label>
              <Form.Control type="number" step="0.01" name="realizado" value={formData.realizado} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3} name="descricao" value={formData.descricao} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingOrcamentoId ? 'Atualizar' : 'Salvar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default OrcamentosPage;
