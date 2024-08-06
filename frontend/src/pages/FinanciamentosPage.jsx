import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Modal, Pagination, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faEdit,
  faTrash,
  faFileExport
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { CSVLink } from 'react-csv';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const StyledContainer = styled(Container)`
  padding: 20px;
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,.05);
  margin-bottom: 20px;
  background-color: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
`;

const ChartContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const StyledTable = styled(Table)`
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
`;

const FinanciamentosPage = () => {
  const { isDarkMode } = useTheme();
  const [financiamentos, setFinanciamentos] = useState([]);
  const [novoFinanciamento, setNovoFinanciamento] = useState({ 
    descricao: '', 
    valor_total: '', 
    taxa_juros: '', 
    parcelas_totais: '', 
    data_inicio: '' 
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFinanciamento, setEditingFinanciamento] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filter, setFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingFinanciamentoId, setDeletingFinanciamentoId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  useEffect(() => {
    fetchFinanciamentos();
  }, []);

  const fetchFinanciamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/financiamentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFinanciamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar financiamentos:', error);
    }
  };

  const handleNovoFinanciamentoChange = (e) => {
    setNovoFinanciamento({ ...novoFinanciamento, [e.target.name]: e.target.value });
  };

  const adicionarFinanciamento = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/financiamentos', novoFinanciamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNovoFinanciamento({ 
        descricao: '', 
        valor_total: '', 
        taxa_juros: '', 
        parcelas_totais: '', 
        data_inicio: '' 
      });
      fetchFinanciamentos();
      showAlert('success', 'Financiamento adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar financiamento:', error);
      showAlert('danger', 'Erro ao adicionar financiamento');
    }
  };

  const editarFinanciamento = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/financiamentos/${editingFinanciamento.id}`, editingFinanciamento, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowEditModal(false);
      fetchFinanciamentos();
      showAlert('success', 'Financiamento atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao editar financiamento:', error);
      showAlert('danger', 'Erro ao editar financiamento');
    }
  };

  const confirmarDeletarFinanciamento = (id) => {
    setDeletingFinanciamentoId(id);
    setShowDeleteModal(true);
  };

  const deletarFinanciamento = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/financiamentos/${deletingFinanciamentoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowDeleteModal(false);
      fetchFinanciamentos();
      showAlert('success', 'Financiamento deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar financiamento:', error);
      showAlert('danger', 'Erro ao deletar financiamento');
    }
  };

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: '', message: '' }), 3000);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedFinanciamentos = [...financiamentos].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredFinanciamentos = sortedFinanciamentos.filter(
    (financiamento) =>
      financiamento.descricao.toLowerCase().includes(filter.toLowerCase()) ||
      financiamento.valor_total.toString().includes(filter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFinanciamentos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calcularValorParcela = (valorTotal, taxaJuros, parcelas) => {
    const taxaMensal = taxaJuros / 100 / 12;
    return (valorTotal * taxaMensal * Math.pow(1 + taxaMensal, parcelas)) / (Math.pow(1 + taxaMensal, parcelas) - 1);
  };

  const dadosGrafico = {
    labels: financiamentos.map(f => f.descricao),
    datasets: [
      {
        label: 'Valor Total',
        data: financiamentos.map(f => f.valor_total),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const dadosGraficoPizza = {
    labels: financiamentos.map(f => f.descricao),
    datasets: [
      {
        data: financiamentos.map(f => f.valor_total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      title: {
        display: true,
        text: 'Visão Geral dos Financiamentos',
        color: isDarkMode ? '#ffffff' : '#000000'
      }
    }
  };

  const opcoesGraficoPizza = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      title: {
        display: true,
        text: 'Distribuição dos Financiamentos',
        color: isDarkMode ? '#ffffff' : '#000000'
      }
    }
  };

  return (
    <Layout>
      <StyledContainer>
        {alert.show && (
          <Alert variant={alert.variant} onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
            {alert.message}
          </Alert>
        )}

        <Row className="mb-4">
          <Col>
            <h2>Financiamentos</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Novo Financiamento</Card.Title>
                <Form onSubmit={adicionarFinanciamento}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="descricao"
                          value={novoFinanciamento.descricao}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Valor Total</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="valor_total"
                          value={novoFinanciamento.valor_total}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Taxa de Juros (%)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="taxa_juros"
                          value={novoFinanciamento.taxa_juros}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Parcelas Totais</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="parcelas_totais"
                          value={novoFinanciamento.parcelas_totais}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Data de Início</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="data_inicio"
                          value={novoFinanciamento.data_inicio}
                          onChange={handleNovoFinanciamentoChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Adicionar Financiamento
                  </Button>
                </Form>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Visão Geral dos Financiamentos</Card.Title>
                <ChartContainer>
                  <Line data={dadosGrafico} options={opcoesGrafico} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col md={6}>
            <StyledCard isDarkMode={isDarkMode}>
              <Card.Body>
                <Card.Title>Distribuição dos Financiamentos</Card.Title>
                <ChartContainer>
                  <Pie data={dadosGraficoPizza} options={opcoesGraficoPizza} />
                </ChartContainer>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>

        <StyledCard isDarkMode={isDarkMode}>
          <Card.Body>
            <Card.Title>Lista de Financiamentos</Card.Title>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Filtrar financiamentos..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </Col>
              <Col md={6} className="text-right">
                <CSVLink
                  data={financiamentos}
                  filename={"financiamentos.csv"}
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faFileExport} className="mr-2" />
                  Exportar CSV
                </CSVLink>
              </Col>
            </Row>
            <StyledTable striped bordered hover variant={isDarkMode ? 'dark' : 'light'} isDarkMode={isDarkMode}>
  <thead>
    <tr>
      <th onClick={() => handleSort('descricao')}>Descrição</th>
      <th onClick={() => handleSort('valor_total')}>Valor Total</th>
      <th onClick={() => handleSort('taxa_juros')}>Taxa de Juros</th>
      <th onClick={() => handleSort('parcelas_totais')}>Parcelas</th>
      <th onClick={() => handleSort('data_inicio')}>Data de Início</th>
      <th>Valor da Parcela</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {currentItems.map((financiamento) => (
      <tr key={financiamento.id}>
        <td>{financiamento.descricao}</td>
        <td>R$ {parseFloat(financiamento.valor_total).toFixed(2)}</td>
        <td>{financiamento.taxa_juros}%</td>
        <td>{financiamento.parcelas_totais}</td>
        <td>{new Date(financiamento.data_inicio).toLocaleDateString()}</td>
        <td>
          R$ {calcularValorParcela(
            financiamento.valor_total,
            financiamento.taxa_juros,
            financiamento.parcelas_totais
          ).toFixed(2)}
        </td>
        <td>
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="mr-2"
            onClick={() => {
              setEditingFinanciamento(financiamento);
              setShowEditModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={() => confirmarDeletarFinanciamento(financiamento.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</StyledTable>

            <Pagination>
              {[...Array(Math.ceil(filteredFinanciamentos.length / itemsPerPage)).keys()].map((number) => (
                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Card.Body>
        </StyledCard>
      </StyledContainer>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Financiamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                type="text" 
                value={editingFinanciamento?.descricao || ''}
                onChange={(e) => setEditingFinanciamento({...editingFinanciamento, descricao: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Valor Total</Form.Label>
              <Form.Control 
                type="number" 
                value={editingFinanciamento?.valor_total || ''}
                onChange={(e) => setEditingFinanciamento({...editingFinanciamento, valor_total: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Taxa de Juros (%)</Form.Label>
              <Form.Control 
                type="number" 
                value={editingFinanciamento?.taxa_juros || ''}
                onChange={(e) => setEditingFinanciamento({...editingFinanciamento, taxa_juros: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Parcelas Totais</Form.Label>
              <Form.Control 
                type="number" 
                value={editingFinanciamento?.parcelas_totais || ''}
                onChange={(e) => setEditingFinanciamento({...editingFinanciamento, parcelas_totais: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data de Início</Form.Label>
              <Form.Control 
                type="date" 
                value={editingFinanciamento?.data_inicio || ''}
                onChange={(e) => setEditingFinanciamento({...editingFinanciamento, data_inicio: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={editarFinanciamento}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir este financiamento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deletarFinanciamento}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default FinanciamentosPage;

