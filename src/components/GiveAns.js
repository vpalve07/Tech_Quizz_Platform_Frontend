import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useLocation, useNavigate } from 'react-router-dom';

export default function QuizQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const [res, resSet] = useState("");
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [completed, setCompleted] = useState(false)
  const token = localStorage.getItem('token');
  const quizId = localStorage.getItem('quizId');
  const BACKEND_URL = `https://tech-quizz-platform.onrender.com/question/${quizId}?page=${page}`;
  const BACKEND_URL2 = `https://tech-quizz-platform.onrender.com/submit/${quizId}`;

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('quizId');
    localStorage.removeItem('userData');
    navigate('/');
    setIsLoggedIn(false);
  }

  const handleOptionChange = (event) => {
    console.log(event.target.value)
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      console.log("InSubmit")
      const response = await axios.get(
        BACKEND_URL2,
        {
          headers: {
            'x-api-key': token
          }
        }
      );
      const state = { propData: response.data }
      navigate('/submit', { state });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(BACKEND_URL,
          {
            questionId: res._id,
            answer: selectedOption,
            marks: res.marks
          },
          {
            headers: {
              'x-api-key': token
            }

          });
        console.log(response.data)
        if (response.data.message == "Quiz completed") {
          setCompleted(true)
        }
        console.log(completed)
        resSet(response.data.data[0])
        const { question, options } = response.data.data[0];
        setQuestion(question);
        setOptions(Object.values(options));
        setSelectedOption("") // Get the option values as an array
      } catch (error) {
        setCompleted(true)
        console.error(error);
        setError(error);
      }
    }
    fetchData();
  }, [BACKEND_URL, token]);

  const handleNextClick = async () => {
    setPage((page) => page + 1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '50px',
        borderRadius: '10px'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '30px',
          width: '90%',
          borderRadius: '10px',
        }} >
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            width: '100%',
          }}
        >
          <TextField
            id="question"
            variant="filled"
            sx={{ width: '100%', marginBottom: '30px' }}
            value={question}
            InputProps={{
              readOnly: true,
              style: { cursor: 'default', backgroundColor: '#f9f9f9' }
            }}
          />

          <RadioGroup
            value={selectedOption}
            onChange={handleOptionChange}
          >
            {options && options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            {!completed && (<Button variant="contained" color="primary" onClick={handleNextClick}>
              Next
            </Button>)}
          </Box>
        </Box>
        {error && (
          <Alert severity="error">{error.response.data.message || 'An unknown error occurred'}</Alert>
        )}
        <Box sx={{ marginTop: '30px' }}>
        </Box>
      </Box>
    </Box>
  );
}