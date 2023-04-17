import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function ColorSchemesExample() {
  const [counter, setCounter] = useState(0);
  const [Token, setToken] = useState("")
  const location = useLocation();

  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('quizId');
      localStorage.removeItem('userData');
      window.location.href = '/';
    }
  }

  const userData = localStorage.getItem('userData');


  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [location.pathname])
  console.log(location.pathname)

  return (
    <>
      <Navbar key={`navbar-${counter}`} collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container fluid>
          {Token ? <>
            <Nav.Link as={Link} to="/dashboard" style={{ color: 'white' }}>
              Dashboard
            </Nav.Link>
            <div style={{ marginLeft: '20px' }}>
            <Nav.Link as={Link} to="/userDetails" style={{ color: 'white' }}>
              User Details
            </Nav.Link>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {JSON.parse(userData)?.type == "organizer" ? (
                <Nav className="me-auto">
                  <div style={{ marginLeft: '20px' }}>
                  <Nav.Link as={Link} to="/quiz" style={{ color: 'white' }}>
                    CreateQuiz
                  </Nav.Link>
                  </div>
                </Nav>
              ) :
              <div style={{ marginLeft: '20px' }}>
              <Nav.Link as={Link} to="/userQuizzes" style={{ color: 'white' }}>
                My Quizzes
              </Nav.Link>
            </div>

              }
            </Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav></> : null}

        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
