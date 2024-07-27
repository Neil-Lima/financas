import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCommentDots, faMoon } from '@fortawesome/free-solid-svg-icons';

const NavbarComp = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Navbar.Brand href="#home">Finanças Pessoais</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link"><FontAwesomeIcon icon={faBell} /></Nav.Link>
          <Nav.Link href="#link"><FontAwesomeIcon icon={faCommentDots} /></Nav.Link>
          <Nav.Link href="#link"><FontAwesomeIcon icon={faMoon} /></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
