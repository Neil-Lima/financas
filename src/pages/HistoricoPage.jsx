import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
  faSort,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

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

const StyledTable = styled(Table)`
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
`;

const SearchInput = styled(Form.Control)`
  max-width: 300px;
  margin-bottom: 20px;
`;

const SortIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: 5px;
`;

const HistoricoPage = () => {
  const { isDarkMode } = useTheme();
  const [transacoes, setTransacoes] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [ordenacao, setOrdenacao] = useState({ campo: 'data', direcao: 'desc' });

  useEffect(() => {
    fetchTransacoes();
  }, []);

  const fetchTransacoes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/transacoes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  };

  const handleFiltroChange = (e) => {
    setFiltroTexto(e.target.value);
  };

  const handleOrdenacao = (campo) => {
    setOrdenacao(prev => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === 'asc' ? 'desc' : 'asc'
    }));
  };

  const transacoesFiltradas = transacoes
    .filter(transacao => 
      transacao.descricao.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      transacao.categoria.toLowerCase().includes(filtroTexto.toLowerCase())
    )
    .sort((a, b) => {
      if (a[ordenacao.campo] < b[ordenacao.campo]) return ordenacao.direcao === 'asc' ? -1 : 1;
      if (a[ordenacao.campo] > b[ordenacao.campo]) return ordenacao.direcao === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <Layout>
      <StyledContainer>
        <Row className="mb-4">
          <Col>
            <h2>Histórico de Transações</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <SearchInput 
              type="text" 
              placeholder="Buscar por descrição ou categoria" 
              value={filtroTexto}
              onChange={handleFiltroChange}
            />
          </Col>
        </Row>

        <StyledCard isDarkMode={isDarkMode}>
          <Card.Body>
            <StyledTable striped bordered hover variant={isDarkMode ? 'dark' : 'light'} isDarkMode={isDarkMode}>
              <thead>
                <tr>
                  <th onClick={() => handleOrdenacao('data')}>
                    Data 
                    <SortIcon icon={ordenacao.campo === 'data' ? (ordenacao.direcao === 'asc' ? faSortUp : faSortDown) : faSort} />
                  </th>
                  <th onClick={() => handleOrdenacao('descricao')}>
                    Descrição
                    <SortIcon icon={ordenacao.campo === 'descricao' ? (ordenacao.direcao === 'asc' ? faSortUp : faSortDown) : faSort} />
                  </th>
                  <th onClick={() => handleOrdenacao('valor')}>
                    Valor
                    <SortIcon icon={ordenacao.campo === 'valor' ? (ordenacao.direcao === 'asc' ? faSortUp : faSortDown) : faSort} />
                  </th>
                  <th onClick={() => handleOrdenacao('categoria')}>
                    Categoria
                    <SortIcon icon={ordenacao.campo === 'categoria' ? (ordenacao.direcao === 'asc' ? faSortUp : faSortDown) : faSort} />
                  </th>
                  <th onClick={() => handleOrdenacao('tipo')}>
                    Tipo
                    <SortIcon icon={ordenacao.campo === 'tipo' ? (ordenacao.direcao === 'asc' ? faSortUp : faSortDown) : faSort} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {transacoesFiltradas.map((transacao) => (
                  <tr key={transacao.id}>
                    <td>{new Date(transacao.data).toLocaleDateString()}</td>
                    <td>{transacao.descricao}</td>
                    <td>R$ {parseFloat(transacao.valor).toFixed(2)}</td>
                    <td>{transacao.categoria}</td>
                    <td>{transacao.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </Card.Body>
        </StyledCard>
      </StyledContainer>
    </Layout>
  );
};

export default HistoricoPage;
