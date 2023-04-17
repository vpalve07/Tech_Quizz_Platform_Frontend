import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

export default function InputWithIcon() {
  const location = useLocation();
  const quizId = location.state.propData.data.quizId
  console.log(quizId);
  const BACKEND_URL = `https://tech-quizz-platform.onrender.com/regQuiz/${quizId}`;
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('quizId');
      localStorage.removeItem('userData');
      navigate('/');
      setIsLoggedIn(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        BACKEND_URL,
        {
          headers: {
            'x-api-key': token,
          },
        }
      );
      navigate('/startQuiz');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '50px', borderRadius: '10px' }}>
          {error && (
            <Alert severity="error">{error.response.data.message || 'An unknown error occurred'}</Alert>
            )}
            {(successMessage && <Alert variant="filled" severity="success">
            Question created successfully
</Alert>)}
            <Box sx={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <TextField id="question" name="question" label="Question" variant="filled" sx={{ width: '100%', marginBottom: '30px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <TextField id="1" name="1" label="op1" variant="filled" sx={{ width: '45%' }} />
                        <TextField id="2" name="2" label="op2" variant="filled" sx={{ width: '45%' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                        <TextField id="3" name="3" label="op3" variant="filled" sx={{ width: '45%' }} />
                        <TextField id="4" name="4" label="op4" variant="filled" sx={{ width: '45%' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                        <TextField id="Ans Number" name="Ans Number" label="Answer Number" variant="filled" sx={{ width: '45%' }} />
                        <TextField id="Marks" name="Marks" label="Marks" variant="filled" sx={{ width: '45%' }} />
                    </Box>
                    <Button type="submit" variant="contained" sx={{ marginTop: '20px', backgroundColor: '#0e4bef', color: '#fff' }} onClick={handleActivate}>Activate Quiz</Button>
              
                    &nbsp;&nbsp;<Button type="submit" variant="contained" sx={{ marginTop: '20px', backgroundColor: '#0e4bef', color: '#fff' }} >Submit Question</Button>
                </form>
            </Box>
        </Box>
    );
}