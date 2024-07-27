import React, { useState } from 'react';
import { Card, Nav, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faWallet,
  faChartPie,
  faUser,
  faCog,
  faHistory,
  faCalendarAlt,
  faFileInvoiceDollar,
  faCreditCard,
  faHandHoldingUsd,
  faExclamationTriangle,
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Sidebar = styled.div`
  background: linear-gradient(180deg, #153158 0%, #0a1a2e 100%);
  height: 100%;
  color: white;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 16.66667%;
  overflow-y: auto;
`;

const SidebarLink = styled(Nav.Link)`
  color: #ffffff;
  padding: 10px 20px;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-left: 3px solid #4e9af1;
  }

  .fa-icon {
    margin-right: 10px;
    width: 20px;
  }
`;

const SidebarDropdown = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .fa-icon {
    margin-right: 10px;
    width: 20px;
  }

  .dropdown-icon {
    margin-left: 10px;
  }
`;

const DropdownContent = styled(Collapse)`
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
`;

const SidebarComp = () => {
  const [openDropdown, setOpenDropdown] = useState('');

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? '' : name);
  };

  return (
    <Sidebar>
      <Card bg="transparent" text="white" className="border-0 mb-4">
        <Card.Body className="text-center">
          <FontAwesomeIcon icon={faUser} size="3x" className="mb-3" />
          <Card.Title>Usuário</Card.Title>
        </Card.Body>
      </Card>
      <Nav className="flex-column">
        <SidebarLink href="/"><FontAwesomeIcon icon={faHome} className="fa-icon" />Início</SidebarLink>
        
        <SidebarDropdown onClick={() => toggleDropdown('finances')}>
          <div>
            <FontAwesomeIcon icon={faWallet} className="fa-icon" />
            Finanças
          </div>
          <FontAwesomeIcon icon={openDropdown === 'finances' ? faAngleUp : faAngleDown} className="dropdown-icon" />
        </SidebarDropdown>
        <DropdownContent in={openDropdown === 'finances'}>
          <Nav className="flex-column">
            <SidebarLink href="/transacoes"><FontAwesomeIcon icon={faWallet} className="fa-icon" />Transações</SidebarLink>
            <SidebarLink href="/orcamentos"><FontAwesomeIcon icon={faChartPie} className="fa-icon" />Orçamentos</SidebarLink>
            <SidebarLink href="/despesas-mes"><FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" />Despesas do Mês</SidebarLink>
          </Nav>
        </DropdownContent>

        <SidebarDropdown onClick={() => toggleDropdown('debts')}>
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} className="fa-icon" />
            Dívidas e Pagamentos
          </div>
          <FontAwesomeIcon icon={openDropdown === 'debts' ? faAngleUp : faAngleDown} className="dropdown-icon" />
        </SidebarDropdown>
        <DropdownContent in={openDropdown === 'debts'}>
          <Nav className="flex-column">
            <SidebarLink href="/contas-pagar"><FontAwesomeIcon icon={faFileInvoiceDollar} className="fa-icon" />Contas a Pagar</SidebarLink>
            <SidebarLink href="/parcelamentos"><FontAwesomeIcon icon={faCreditCard} className="fa-icon" />Parcelamentos</SidebarLink>
            <SidebarLink href="/financiamentos"><FontAwesomeIcon icon={faHandHoldingUsd} className="fa-icon" />Financiamentos</SidebarLink>
          </Nav>
        </DropdownContent>

        <SidebarLink href="/perfil"><FontAwesomeIcon icon={faUser} className="fa-icon" />Perfil</SidebarLink>
        <SidebarLink href="/configuracoes"><FontAwesomeIcon icon={faCog} className="fa-icon" />Configurações</SidebarLink>
        <SidebarLink href="/historico"><FontAwesomeIcon icon={faHistory} className="fa-icon" />Histórico</SidebarLink>
      </Nav>
    </Sidebar>
  );
};

export default SidebarComp;
