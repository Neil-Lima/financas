import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from '../context/contextTheme';
import { useNavigate } from 'react-router-dom';

const ThemeIcon = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  margin-left: 15px;
`;

function NavMenuComp() {
  const { theme, toggleTheme } = useTheme();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <Navbar bg={theme} variant={theme} expand="md" className="sticky-top shadow-sm">
      <Navbar.Brand href="#" className="col-md-3 col-lg-2 me-0 px-3">Finanças Pessoais</Navbar.Brand>
      <Navbar.Toggle aria-controls="sidebarMenu" />
      <Form.Control type="text" placeholder="Pesquisar" className="w-100" />
      <Nav>
        <Nav.Item>
          <ThemeIcon onClick={toggleTheme} theme={theme}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </ThemeIcon>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="px-3">{userName}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={handleLogout} className="px-3">Sair</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default NavMenuComp;
