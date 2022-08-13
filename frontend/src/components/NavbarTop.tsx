import React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';

const NavbarTop = () => {
  
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SIPWB</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/list">List</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};
export default NavbarTop;
