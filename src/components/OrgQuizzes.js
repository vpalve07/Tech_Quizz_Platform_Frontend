import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
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
            navigate('/', { replace: true });
        }
    }, [token]);

    const handleLeaderboard = (quizId) =>{
        console.log(quizId,"quiz")
        navigate(`/leaderboard/${quizId}`)
    }

    function handleLogout() {
        if (localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
            localStorage.removeItem('quizId');
            navigate("/")
            setIsLoggedIn(false);
        }
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: '20px', margin: '20px 0' }}>
                    <Box display="flex" justifyContent="flex-end">
                        {/* <Link className="logoutBotton" to="/">
              <Button variant="contained" onClick={handleLogout}>
                Log Out
              </Button>
            </Link> */}
                    </Box>
                    <h1>Organizer Quizzes</h1><br />
                    {quizData.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>isActive</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>quizType</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>quizName</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>timeLimit</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>topicTags</TableCell>
                                    <TableCell style={{ padding: '0 50px', textAlign: 'center' }}>totalScore</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quizData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ textAlign: 'center' }}>{item.isActive ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.quizName}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.quizType}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.timeLimit}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.topicTags.join(', ')}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.totalScore}</TableCell>
                                        <Button onClick={() => handleLeaderboard(item._id)}>Leaderboard</Button>
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
