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
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap"

const BACKEND_URL = 'https://tech-quizz-platform.onrender.com/ongoingQuizzes';

function QuizData() {
    const [propData, setPropData] = React.useState("")
    const [error, setError] = useState(null);
    const [quizData, setQuizData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(BACKEND_URL, {
                    headers: {
                        'x-api-key': token,
                    },
                });
                console.log(response.data)
                setQuizData(response.data.data)
            } catch (error) {
                console.error(error);
                setError(error)
            }
        };
        fetchQuizData();
    }, []);

    const handleLeaderboard = (quizId) =>{
        navigate(`/leaderboard/${quizId}`)
    }
    const handleRegistration = async (quizId) => {
        const BACKEND_URL2 = `https://tech-quizz-platform.onrender.com/regQuiz/${quizId}`;
        console.log(quizId)
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(BACKEND_URL2, null, {
                headers: {
                    'x-api-key': token,
                },
            });
            const state = { propData: response.data }
            console.log(response.data);
            localStorage.setItem('quizId',quizId);
            navigate(`/startQuiz`, { state });
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: '20px', margin: '20px 0' }}>
                    <Box display="flex" justifyContent="flex-end">
                        {error && (
                            <Alert severity="error">{error.response.data.message || 'An unknown error occurred'}</Alert>
                        )}
                    </Box>
                    <h1>QuizData</h1><br />
                    {quizData.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>isActive</TableCell> */}
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>quizName</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>quizType</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>timeLimit</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>topicTags</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>totalScore</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>Register</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quizData.map((item, index) => (
                                    <TableRow key={index}>
                                        {/* <TableCell style={{ textAlign: 'center' }}>{item.isActive ? 'Active' : 'Inactive'}</TableCell> */}
                                        <TableCell style={{ textAlign: 'center' }}>{item.quizName}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.quizType}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.timeLimit}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.topicTags.join(', ')}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.totalScore}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <Button onClick={() => handleRegistration(item._id)}>Register</Button>
                                            <Button onClick={() => handleLeaderboard(item._id)}>Leaderboard</Button>
                                        </TableCell>
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
