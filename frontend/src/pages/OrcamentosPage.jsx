import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styled from "styled-components";
import Layout from "../layout/Layout";

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
`;

function OrcamentoPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const orcamentos = [
    { categoria: "Alimentação", planejado: 1000, gasto: 750 },
    { categoria: "Transporte", planejado: 500, gasto: 450 },
    { categoria: "Lazer", planejado: 300, gasto: 200 },
    { categoria: "Moradia", planejado: 1500, gasto: 1400 },
    { categoria: "Saúde", planejado: 400, gasto: 150 },
    { categoria: "Educação", planejado: 600, gasto: 550 },
  ];

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Orçamentos</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm" onClick={handleShowModal}>
            <FaPlus /> Novo Orçamento
          </Button>
        </div>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {orcamentos.map((orcamento, idx) => (
          <Col key={idx}>
            <StyledCard>
              <Card.Body>
                <Card.Title>{orcamento.categoria}</Card.Title>
                <Card.Text>
                  Planejado: R$ {orcamento.planejado.toFixed(2)}
                  <br />
                  Gasto: R$ {orcamento.gasto.toFixed(2)}
                </Card.Text>
                <ProgressBar
                  now={(orcamento.gasto / orcamento.planejado) * 100}
                  label={`${(
                    (orcamento.gasto / orcamento.planejado) *
                    100
                  ).toFixed(0)}%`}
                  variant={
                    orcamento.gasto <= orcamento.planejado
                      ? "success"
                      : "danger"
                  }
                />
                <div className="mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                  >
                    <FaEdit /> Editar
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    <FaTrash /> Excluir
                  </Button>
                </div>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Orçamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor Planejado</Form.Label>
              <Form.Control type="number" step="0.01" required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default OrcamentoPage;

