import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Form, Button, Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faExchangeAlt, faWallet, faChartPie, faChartLine, faBullseye, faSun, faMoon, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Sidebar = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.05), 2px 0 5px 0 rgba(0,0,0,.05);
`;

const SidebarSticky = styled.div`
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

const NavLink = styled(Nav.Link)`
  font-weight: 500;
  color: var(--bs-body-color);
  padding: 15px 25px;
  border-left: 4px solid transparent;
  transition: 0.3s ease;

  &:hover {
    background-color: var(--bs-tertiary-bg);
    border-left: 4px solid var(--bs-primary);
  }

  &.active {
    color: var(--bs-primary);
    background-color: var(--bs-secondary-bg);
    border-left: 4px solid var(--bs-primary);
  }

  i {
    margin-right: 10px;
  }
`;

const ThemeSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Slider = styled.label`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196F3;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }

  .fa-sun {
    position: absolute;
    left: 8px;
    top: 8px;
    color: #fff;
  }

  .fa-moon {
    position: absolute;
    right: 8px;
    top: 8px;
    color: #fff;
  }
`;

function HomePage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');

    const handleChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    prefersDarkScheme.addListener(handleChange);

    return () => {
      prefersDarkScheme.removeListener(handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const chartData = {
    labels: ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Saúde'],
    datasets: [{
      data: [300, 500, 200, 150, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ]
    }]
  };

  return (
    <div>
      <Navbar bg={theme} variant={theme} expand="md" className="sticky-top shadow">
        <Container fluid>
          <Navbar.Brand href="#">Finanças Pessoais</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebarMenu" />
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Pesquisar" className="me-2" aria-label="Search" />
          </Form>
          <Nav>
            <ThemeSwitch>
              <Form.Check
                type="checkbox"
                id="themeSwitch"
                onChange={toggleTheme}
                checked={theme === 'dark'}
                style={{ display: 'none' }}
              />
              <Slider htmlFor="themeSwitch">
                <FontAwesomeIcon icon={faSun} />
                <FontAwesomeIcon icon={faMoon} />
              </Slider>
            </ThemeSwitch>
            <Nav.Link href="#">Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Sidebar className={`col-md-3 col-lg-2 d-md-block bg-${theme} collapse`}>
            <SidebarSticky>
              <Nav className="flex-column">
                <NavLink active><FontAwesomeIcon icon={faHome} /> Dashboard</NavLink>
                <NavLink><FontAwesomeIcon icon={faExchangeAlt} /> Transações</NavLink>
                <NavLink><FontAwesomeIcon icon={faWallet} /> Contas</NavLink>
                <NavLink><FontAwesomeIcon icon={faChartPie} /> Orçamentos</NavLink>
                <NavLink><FontAwesomeIcon icon={faChartLine} /> Relatórios</NavLink>
                <NavLink><FontAwesomeIcon icon={faBullseye} /> Metas</NavLink>
              </Nav>
            </SidebarSticky>
          </Sidebar>

          <Col md={9} lg={10} className="ms-sm-auto px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <Button variant="outline-secondary" size="sm" className="me-2">Compartilhar</Button>
                <Button variant="outline-secondary" size="sm" className="me-2">Exportar</Button>
                <Button variant="outline-secondary" size="sm" className="dropdown-toggle">
                  <FontAwesomeIcon icon={faCalendar} /> Esta semana
                </Button>
              </div>
            </div>

            <Row>
              <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Saldo Total</Card.Title>
                    <Card.Text as="h2" className="text-primary">R$ 5.240,00</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Receitas do Mês</Card.Title>
                    <Card.Text as="h2" className="text-success">R$ 3.500,00</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Despesas do Mês</Card.Title>
                    <Card.Text as="h2" className="text-danger">R$ 2.100,00</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <h2>Gastos por Categoria</h2>
            <div style={{ height: '40vh', width: '80vw' }}>
              <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            <h2 className="mt-5">Últimas Transações</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/05/2023</td>
                  <td>Supermercado</td>
                  <td>Alimentação</td>
                  <td className="text-danger">-R$ 250,00</td>
                </tr>
                <tr>
                  <td>03/05/2023</td>
                  <td>Salário</td>
                  <td>Renda</td>
                  <td className="text-success">R$ 3.500,00</td>
                </tr>
                <tr>
                  <td>05/05/2023</td>
                  <td>Conta de Luz</td>
                  <td>Moradia</td>
                  <td className="text-danger">-R$ 120,00</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
