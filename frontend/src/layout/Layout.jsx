import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComp from '../components/NavbarComp';
import SidebarComp from '../components/SidebarComp';

const Layout = ({ children }) => {
  return (
    <Container fluid className="p-0">
      <Row noGutters>
        <Col md={2} className="d-none d-md-block">
          <SidebarComp />
        </Col>
        <Col md={10}>
          <NavbarComp />
          <Container fluid>
            {children}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
