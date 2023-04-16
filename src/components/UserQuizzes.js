import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const BACKEND_URL = 'https://tech-quizz-platform.onrender.com/userQuizzes';

function QuizData() {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(BACKEND_URL, {
          headers: {
            'x-api-key': token,
          },
        });
        setQuizData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', margin: '20px 0' }}>
          <Box display="flex" justifyContent="flex-end">
          </Box>
          <h1>My Quizzes</h1><br />
          {quizData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>isActive</TableCell>
                  <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>quizType</TableCell>
                  <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>quizName</TableCell>
                  <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>timeLimit</TableCell>
                  <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>topicTags</TableCell>
                  <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ textAlign: 'center' }}>{item.quizId.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{item.quizId.quizName}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{item.quizId.quizType}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{item.quizId.timeLimit}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{item.quizId.topicTags.join(', ')}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{item.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          ) : (
            <p>No quiz data available.</p>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default QuizData;
