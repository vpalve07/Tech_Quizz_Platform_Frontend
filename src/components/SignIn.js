import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const theme = createTheme();
const BACKEND_URL = 'https://tech-quizz-platform.onrender.com/login';
const BACKEND_URL2 = 'https://tech-quizz-platform.onrender.com/userDetails'

export default function SignIn() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const checkToken = localStorage.getItem("token")
  useEffect(() => {
    if (checkToken) {
      navigate('/dashboard', { replace: true });
    }
  }, [checkToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      const response = await axios.post(BACKEND_URL, { email, password });
      setToken(response.data.token);
      localStorage.setItem('token',response.data.token)
      let token = response.data.token
      const response2 = await axios.get(BACKEND_URL2,
        {
          headers: {
            'x-api-key': token,
          },
      })
      // console.log(response2.data)
      localStorage.setItem('userData',JSON.stringify(response2.data))

      if (location.state && location.state.from) {
        navigate(location.state.from, { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };


  const handleSignUpClick = (event) => {
    event.preventDefault();
    navigate('/user', { state: { from: '/signin' } });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
          </div>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && (
              <Alert severity="error">{error.response.data.message || 'An unknown error occurred'}</Alert>
            )}
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPass" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
