import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const theme = createTheme();
const BACKEND_URL = 'https://tech-quizz-platform.onrender.com/forgotPass';

export default function ForgetPass() {
  const [propData , setPropData] = React.useState("")
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const checkToken = localStorage.getItem("token")
  useEffect(() => {
    if (checkToken) {
      navigate('/dashboard', { replace: true });
    }
  }, [checkToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    try {
      const response = await axios.post(BACKEND_URL, { email: email });
      const state = { propData: response.data }
      navigate('/resetPassword', { state });
    } catch (error) {
      console.error(error);
      setError(error);
    }
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
            Forget Password
          </Typography>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Forgot password
            </Button>
            {error && (
              <Alert severity="error">
                {error.response?.data?.message || 'An unknown error occurred'}
              </Alert>
            )}
            {/* <Link to={`/resetPassword?email=${email}&secretQuestion=${secretQuestion}`}>
              Reset Password
            </Link> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
