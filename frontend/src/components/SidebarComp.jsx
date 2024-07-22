import React from 'react';
import { Col, Nav } from 'react-bootstrap';
import { FaHome, FaExchangeAlt, FaWallet, FaChartPie, FaChartLine, FaBullseye } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from '../context/contextTheme';
import { Link, useLocation } from 'react-router-dom';

const StyledSidebar = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.05), 2px 0 5px 0 rgba(0,0,0,.05);
`;

const StyledNavLink = styled(Link)`
  font-weight: 500;
  color: var(--bs-body-color);
  padding: 15px 25px;
  border-left: 4px solid transparent;
  transition: 0.3s ease;
  text-decoration: none;
  display: block;

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

function SidebarComp() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <StyledSidebar as={Col} md={3} lg={2} className={`d-md-block bg-${theme} sidebar collapse`}>
      <div className="position-sticky pt-3">
        <Nav className="flex-column">
          <StyledNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            <FaHome /> Dashboard
          </StyledNavLink>
          <StyledNavLink to="/transacoes" className={location.pathname === '/transacoes' ? 'active' : ''}>
            <FaExchangeAlt /> Transações
          </StyledNavLink>
          <StyledNavLink to="/contas" className={location.pathname === '/contas' ? 'active' : ''}>
            <FaWallet /> Contas
          </StyledNavLink>
          <StyledNavLink to="/orcamentos" className={location.pathname === '/orcamentos' ? 'active' : ''}>
            <FaChartPie /> Orçamentos
          </StyledNavLink>
          <StyledNavLink to="/relatorios" className={location.pathname === '/relatorios' ? 'active' : ''}>
            <FaChartLine /> Relatórios
          </StyledNavLink>
          <StyledNavLink to="/metas" className={location.pathname === '/metas' ? 'active' : ''}>
            <FaBullseye /> Metas
          </StyledNavLink>
        </Nav>
      </div>
    </StyledSidebar>
  );
}

export default SidebarComp;
