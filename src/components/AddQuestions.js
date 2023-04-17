import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const BACKEND_URL = "https://tech-quizz-platform.onrender.com";

export default function AppQuestion() {
  let { quizId } = useParams();
  console.log(quizId)
  const location = useLocation();

  // Define a default value for propData
  const defaultPropData = { QuizId: null };

  // If propData is not present, use the default value
  const propData = location.state?.propData || defaultPropData;

  console.log(propData);

  // Use the quizId passed via propData, or use the stored quizId from the previous props
  // const quizId = propData.QuizId || localStorage.getItem('quizId');

  // Store the quizId for future use
  // localStorage.setItem('quizId', quizId);


  // Define the URL for the backend API
  // const BACKEND_URL = `https://tech-quizz-platform.onrender.com/quizQue/${quizId}`;
  // const BACKEND_URL2 = `https://tech-quizz-platform.onrender.com/activateQuiz/${quizId}`;

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
    const formData = new FormData(event.target);
    const question = formData.get('question');
    const op1 = formData.get('1');
    const op2 = formData.get('2');
    const op3 = formData.get('3');
    const op4 = formData.get('4');
    const ans = formData.get('Ans Number');
    const marks = formData.get('Marks');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BACKEND_URL}/quizQue/${quizId}`,
        {
          question,
          options: {
            "1": op1,
            "2": op2,
            "3": op3,
            "4": op4
          },
          ans,
          marks
        },
        {
          headers: {
            'x-api-key': token,
          },
        }
      );
      setSuccessMessage(response.data.message);
      navigate(`/quizQue/${quizId}`);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleActivate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BACKEND_URL}/activateQuiz/${quizId}`,
        {},
        {
          headers: {
            'x-api-key': token,
          },
        }
      );
      console.log(response);
      setSuccessMessage(response.data.message);
      navigate('/Dashboard');
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
          <TextField id="question" name="question" label="Question" focused sx={{ width: '100%', marginBottom: '30px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <TextField id="1" name="1" label="op1" focused sx={{ width: '45%' }} />
            <TextField id="2" name="2" label="op2" focused sx={{ width: '45%' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
            <TextField id="3" name="3" label="op3" focused sx={{ width: '45%' }} />
            <TextField id="4" name="4" label="op4" focused sx={{ width: '45%' }} />
          </Box><br/>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px', margin: 'auto', alignItems: 'center' }}>
            <TextField id="Ans Number" name="Ans Number" label="Answer Number" focused sx={{ width: '15%' }} />
            <TextField id="Marks" name="Marks" label="Marks" focused sx={{ width: '15%' }} />
          </Box>

          <Button type="submit" variant="contained" sx={{ marginTop: '20px', backgroundColor: '#0e4bef', color: '#fff' }} onClick={handleActivate}>Activate Quiz</Button>

          &nbsp;&nbsp;<Button type="submit" variant="contained" sx={{ marginTop: '20px', backgroundColor: '#0e4bef', color: '#fff' }} >Submit Question</Button>
        </form>
      </Box>
    </Box>
  );
}