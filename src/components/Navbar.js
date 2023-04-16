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
  

  useEffect(()=>{
    const token = localStorage.getItem('token')
    setToken(token)
  },[location.pathname])
  console.log(location.pathname)
  
  return (
    <>
    <Navbar key={`navbar-${counter}`} collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {Token?<>
          <Nav.Link as={Link} to="/dashboard" style={{color:'white'}}>
                Dashboard
              </Nav.Link>
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
            </Nav>
          ) : 
            null
          }
        </Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav></>:null}
        
      </Container>
    </Navbar>
    </>
  );
}

export default ColorSchemesExample;
