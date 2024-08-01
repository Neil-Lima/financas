import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComp from '../components/NavbarComp';
import SidebarComp from '../components/SidebarComp';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const StyledContainer = styled(Container)`
  background-color: ${props => props.isDarkMode ? '#121212' : '#ffffff'};
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <StyledContainer fluid className="p-0" isDarkMode={isDarkMode}>
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
    </StyledContainer>
  );
};

export default Layout;
