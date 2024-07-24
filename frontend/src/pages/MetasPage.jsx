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
  const [metas, setMetas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    valorMeta: '',
    dataLimite: '',
    descricao: ''
  });
  const [editingMetaId, setEditingMetaId] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setFormData({ nome: '', valorMeta: '', dataLimite: '', descricao: '' });
    setEditingMetaId(null);
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de criação/edição de meta local, sem comunicação com o backend
  };

  const handleEdit = (meta) => {
    setFormData({
      nome: meta.nome,
      valorMeta: meta.valorMeta.toString(),
      dataLimite: meta.dataLimite.split('T')[0],
      descricao: meta.descricao
    });
    setEditingMetaId(meta.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // Aqui você pode adicionar a lógica de exclusão de meta local, sem comunicação com o backend
  };

  const formatarValor = (valor) => {
    if (typeof valor === 'number') {
      return valor.toFixed(2);
    }
    return '0.00';
  };

  const calcularProgresso = (valorAtual, valorMeta) => {
    if (typeof valorAtual === 'number' && typeof valorMeta === 'number' && valorMeta !== 0) {
      return ((valorAtual / valorMeta) * 100).toFixed(0);
    }
    return '0';
  };

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
        {metas.map((meta) => (
          <Col key={meta.id}>
            <StyledCard>
              <Card.Body>
                <Card.Title>{meta.nome}</Card.Title>
                <Card.Text>Meta: R$ {formatarValor(meta.valorMeta)}</Card.Text>
                <Card.Text>Progresso: R$ {formatarValor(meta.valorAtual)} ({calcularProgresso(meta.valorAtual, meta.valorMeta)}%)</Card.Text>
                <ProgressBar now={calcularProgresso(meta.valorAtual, meta.valorMeta)} className="mb-3" />
                <Card.Text>Data Limite: {new Date(meta.dataLimite).toLocaleDateString()}</Card.Text>
                <Card.Text>{meta.descricao}</Card.Text>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(meta)}><FaEdit /> Editar</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(meta.id)}><FaTrash /> Excluir</Button>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMetaId ? 'Editar Meta' : 'Nova Meta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Meta</Form.Label>
              <Form.Control type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor da Meta</Form.Label>
              <Form.Control type="number" step="0.01" name="valorMeta" value={formData.valorMeta} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data Limite</Form.Label>
              <Form.Control type="date" name="dataLimite" value={formData.dataLimite} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3} name="descricao" value={formData.descricao} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingMetaId ? 'Atualizar' : 'Salvar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default MetasPage;
