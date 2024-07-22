import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavMenuComp from '../components/NavMenuComp';
import SidebarComp from '../components/SidebarComp';

function Layout({ children }) {
  return (
    <Container fluid>
      <NavMenuComp />
      <Row>
        <SidebarComp />
        <Col md={9} lg={10} className="ms-sm-auto px-md-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
