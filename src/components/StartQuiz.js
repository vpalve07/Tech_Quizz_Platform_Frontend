import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from "react-bootstrap";
import { Alert } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    backgroundImage: "url('https://www.instantprint.co.uk/umbraco-media/9476/quiz-button-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '99vw',
    height: '92vh',
    margin: 0,
    padding: 0
  },
  button: {
    top: 30,
    right: 20
  }
};

const mdTheme = createTheme();

const Container = styled('div')(styles.container);
const LogoutButton = styled(Button)(styles.button);

export default function StartQuiz() {
  // const location = useLocation();
  // console.log(location.state.propData.id)
  const quizId = localStorage.getItem('quizId');
  console.log(quizId)
  const BACKEND_URL = `https://tech-quizz-platform.onrender.com/startQuiz/${quizId}`;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // define isLoggedIn and setIsLoggedIn here

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [token]);

  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('quizId');
      localStorage.removeItem('userData');
      navigate("/")
      setIsLoggedIn(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        BACKEND_URL,
        {
          headers: {
            'x-api-key': token,
          },
        }
      );
      const state = { propData: response.data }
      navigate('/question',{state});
      setSuccess('Quiz started successfully!');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleSnackbarClose = () => {
    setError(null);
    setSuccess(null);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {error && (
              <Alert severity="error">{error.response.data.message || 'An unknown error occurred'}</Alert>
            )}
      <Container>
        <Button variant="primary" onClick={handleSubmit}>Start Quiz</Button>
      </Container>
    </ThemeProvider>
  );
}
