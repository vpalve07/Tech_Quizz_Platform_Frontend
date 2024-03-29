import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import QuizIcon from '@mui/icons-material/Quiz';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate,useParams } from 'react-router-dom';

const theme = createTheme();


export default function UpdateQuiz() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/signIn', { replace: true });
    } else {
      setIsLoggedIn(true);
    }
  }, [token]);
  
  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('quizId');
      localStorage.removeItem('userData');
      setIsLoggedIn(false); 
      navigate("/signIn")
    }
  }
  let { quizId } = useParams();
  const BACKEND_URL = `https://tech-quizz-platform.onrender.com/updateQuiz/${quizId}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const quizName = data.get('quizName');
    const quizType = data.get('quizType');
    const timeLimit = data.get('timeLimit');
    const topicTags = data.get('topicTags');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        BACKEND_URL,
        { quizName, quizType, timeLimit, topicTags },
        {
          headers: {
            'x-api-key': token,
          },
        }
      );
      const state = { propData: response.data }
      navigate('/dashboard',{ state });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.rolandberger.com/img/Tiles/KIQuiz_Search_result_teaser_01.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 5,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <QuizIcon/>
            <Typography component="h1" variant="h5">
              Update Quiz
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="quizName"
                label="Quiz Name"
                name="quizName"
                autoComplete="quizName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="quizType"
                label="Quiz Type"
                type="quizType"
                id="quizType"
                autoComplete="quizType"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="timeLimit"
                label="Time Limit"
                type="timeLimit"
                id="timeLimit"
                autoComplete="timeLimit"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="topicTags"
                label="Topic Tags"
                type="topicTags"
                id="topicTags"
                autoComplete="topicTags"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Quiz
              </Button>
              {error && (
              <Alert severity="error">{error.response.data.message || 'An unknown error occurred'}</Alert>
            )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}