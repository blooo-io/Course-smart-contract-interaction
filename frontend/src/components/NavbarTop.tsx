import React from 'react'
import classnames from 'classnames'

import { Container, Nav, Navbar } from 'react-bootstrap'

/**
 *  Navbar component
 * @component
 * @category Layout
 * @return {Jsx}
 */
const NavbarTop = () => {

  return (
    <Navbar bg="transparent" variant="dark">
      <Container className="mw-100 w-100 mx-5">
        <Navbar.Brand
          href="/home"
          className={classnames("font-weight-bold",{
            'text-magic-mint': window.location.href.includes('home'),
            'text-indigo': !window.location.href.includes('home'),
          })}
        >
          SIPWB
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="text-indigo font-weight-bold" href="/home">
            Home
          </Nav.Link>
          <Nav.Link className="text-indigo font-weight-bold" href="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link className="text-indigo font-weight-bold" href="/list">
            List
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
export default NavbarTop
