import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ColorSchemesExample() {
  const [counter, setCounter] = useState(0);

  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('quizId');
      localStorage.removeItem('userData');
      window.location.href = '/';
    }
  }

  const userData = localStorage.getItem('userData');

  return (
    <Navbar key={`navbar-${counter}`} collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {JSON.parse(userData)?.type == "organizer" ? (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/quiz">
                CreateQuiz
              </Nav.Link>
              <Nav.Link as={Link} to="/updateQuiz">
                UpdateQuiz
              </Nav.Link>
              <Nav.Link as={Link} to="/quizQue">
                AddQuestion
              </Nav.Link>
              <Nav.Link as={Link} to="/quizQue">
                ActivateQuiz
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/organizerQuizzes">
                organizerQuizzes
              </Nav.Link> */}
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/leaderboard">
                Leaderboard
              </Nav.Link>
              <Nav.Link as={Link} to="/userQuizzes">
                userQuizzes
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/ongoingQuizzes">
                ongoingQuizzes
              </Nav.Link> */}
            </Nav>
          )}
        </Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
