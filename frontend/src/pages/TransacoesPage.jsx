import React, { useState } from 'react';
import { Row, Col, Button, Card, Table, Pagination, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import Layout from '../layout/Layout';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
`;

function TransacoesPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Layout>  
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Transações</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm" onClick={handleShowModal}>
            <FaPlus /> Nova Transação
          </Button>
        </div>
      </div>

      <StyledCard className="mb-4">
        <Card.Body>
          <Card.Title>Filtros</Card.Title>
          <Form className="row g-3">
            <Form.Group as={Col} md={4}>
              <Form.Label>Data Início</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group as={Col} md={4}>
              <Form.Label>Data Fim</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group as={Col} md={4}>
              <Form.Label>Categoria</Form.Label>
              <Form.Select>
                <option>Todas</option>
                <option>Alimentação</option>
                <option>Moradia</option>
                <option>Transporte</option>
                <option>Lazer</option>
              </Form.Select>
            </Form.Group>
            <Col xs={12}>
              <Button variant="primary" type="submit">Aplicar Filtros</Button>
            </Col>
          </Form>
        </Card.Body>
      </StyledCard>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Conta</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01/05/2023</td>
            <td>Supermercado</td>
            <td>Alimentação</td>
            <td>Conta Corrente</td>
            <td className="text-danger">-R$ 250,00</td>
            <td>
              <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /></Button>
              <Button variant="outline-danger" size="sm"><FaTrash /></Button>
            </td>
          </tr>
          <tr>
            <td>03/05/2023</td>
            <td>Salário</td>
            <td>Renda</td>
            <td>Conta Corrente</td>
            <td className="text-success">R$ 3.500,00</td>
            <td>
              <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /></Button>
              <Button variant="outline-danger" size="sm"><FaTrash /></Button>
            </td>
          </tr>
          <tr>
            <td>05/05/2023</td>
            <td>Conta de Luz</td>
            <td>Moradia</td>
            <td>Conta Corrente</td>
            <td className="text-danger">-R$ 120,00</td>
            <td>
              <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /></Button>
              <Button variant="outline-danger" size="sm"><FaTrash /></Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev disabled />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Transação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control type="number" step="0.01" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select required>
                <option value="">Selecione uma categoria</option>
                <option>Alimentação</option>
                <option>Moradia</option>
                <option>Transporte</option>
                <option>Lazer</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Conta</Form.Label>
              <Form.Select required>
                <option value="">Selecione uma conta</option>
                <option>Conta Corrente</option>
                <option>Poupança</option>
                <option>Cartão de Crédito</option>
              </Form.Select>
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

export default TransacoesPage;
