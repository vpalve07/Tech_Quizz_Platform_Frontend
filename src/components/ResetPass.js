import * as React from 'react';
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
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
// import {nextPageData} from "./ForgetPass"

const theme = createTheme();
const BACKEND_URL = 'https://tech-quizz-platform.onrender.com/resetPassword';

export default function ResetPassword() {
  const location = useLocation();
  // console.log(location.state.propData.data.email)
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [email, setEmail] = React.useState('');
  const [secretQuestion, setSecretQuestion] = React.useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const secretQuestion = data.get('secretQuestion');
    const answer = data.get('answer');
    const newPassword = data.get('newPassword');
    try {
      const response = await axios.post(BACKEND_URL, { email, secretQuestion, answer, newPassword });
      // console.log(response.data);
      navigate('/',{replace:true});
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };


  React.useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const email = searchParams.get('email');
    const secretQuestion = searchParams.get('secretQuestion');
    setEmail(email);
    setSecretQuestion(secretQuestion);
  }, [search]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  // disabled
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  defaultValue={location.state.propData.data.email} // set default value of email field
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // disabled
                  fullWidth
                  name="secretQuestion"
                  label="Secret Question"
                  type="text"
                  id="secretQuestion"
                  autoComplete="off"
                  defaultValue={location.state.propData.data.secretQuestion}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                // onChange={(e) => setSecretQuestion(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="answer"
                  label="answer"
                  type="password"
                  id="answer"
                  autoComplete="answer"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  label="new-Password"
                  type="password"
                  id="newPassword"
                  autoComplete="newPassword"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            {error && (
              <Alert severity="error">{error.response.data.message || 'An unknown error occurred'}</Alert>
            )}

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}