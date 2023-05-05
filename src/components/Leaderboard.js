import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const BACKEND_URL = "https://tech-quizz-platform.onrender.com";

function Leaderboard() {
  let { quizId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchLeaderboardData = async () => {
      if (!token) {
        navigate('/signIn', { replace: true });
      }
      try {
        const response = await axios.get(`${BACKEND_URL}/leaderboard/${quizId}`, {
            headers: {
                'x-api-key': token
            },
        });
        console.log(response)
        setLeaderboardData(response.data.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchLeaderboardData();
  }, []);

  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('quizId');
      localStorage.removeItem('userData');
      navigate("/signIn")
      setIsLoggedIn(false); 
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, m: 2 }}>
       
      </Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Leaderboard
      </Typography>
      <TableContainer component={Paper} sx={{ width: '80%', mb: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.userId.name}</TableCell>
                <TableCell>{item.userId.email}</TableCell>
                <TableCell>{item.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Leaderboard;
