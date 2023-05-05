import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Button } from "react-bootstrap"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'https://tech-quizz-platform.onrender.com/organizerQuizzes';

function QuizData() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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
                console.log(response.data)
                setQuizData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuizData();
    }, []);


    useEffect(() => {
        if (!token) {
            navigate('/signIn', { replace: true });
        }
    }, [token]);

    const handleUpdate = (quizId) => {
        // console.log(quizId, "quiz")
        navigate(`/updateQuiz/${quizId}`)
    }

    const handleAddQuestion = (quizId) => {
        console.log(quizId, "quiz")
        navigate(`/quizQue/${quizId}`)
    }

    const handleLeaderboard = (quizId) => {
        // console.log(quizId, "quiz")
        navigate(`/leaderboard/${quizId}`)
    }

    function handleLogout() {
        if (localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
            localStorage.removeItem('quizId');
            navigate("/signIn")
            setIsLoggedIn(false);
        }
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: '20px', margin: '20px 0' }}>
                    <Box display="flex" justifyContent="flex-end" />
                    <h1>Organizer Quizzes</h1><br />
                    {quizData.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Update Quizz</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Add Question</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>isActive</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Quiz Type</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Quiz Name</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Time Limit</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Topic Tags</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Total Score</TableCell>
                                    <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>Leaderboard</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quizData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>
                                            <Button style={{ backgroundColor: '#007bff', color: 'white' }} onClick={() => handleUpdate(item._id)}>Update</Button>
                                        </TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>
                                            <Button style={{ backgroundColor: '#007bff', color: 'white' }} onClick={() => handleAddQuestion(item._id)}>AddQue/ActivateQuiz</Button>
                                        </TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>{item.isActive ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>{item.quizName}</TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>{item.quizType}</TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>{item.timeLimit}</TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>{item.topicTags.join(', ')}</TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>{item.totalScore}</TableCell>
                                        <TableCell style={{ padding: '5px', fontSize: '14px', textAlign: 'center' }}>
                                            <Button style={{ backgroundColor: '#007bff', color: 'white' }} onClick={() => handleLeaderboard(item._id)}>Leaderboard</Button>
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
