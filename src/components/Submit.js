import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const BACKEND_URL = "https://tech-quizz-platform.onrender.com";

function Submit() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const quizId = localStorage.getItem("quizId");
    const fetchLeaderboardData = async () => {
      if (!token) {
        navigate("/", { replace: true });
      }
      try {
        const response = await axios.get(
          `${BACKEND_URL}/submit/${quizId}`,
          {
            headers: {
              "x-api-key": token,
            },
          }
        );
        setLeaderboardData([location.state.propData.data]);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchLeaderboardData();
  }, []);

  function handleLogout() {
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
      localStorage.removeItem("quizId");
      localStorage.removeItem('userData');
      navigate("/");
      setIsLoggedIn(false);
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 4 }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 0, m: 2 }}>
        {/* <Link className="logoutButton" to="/">
          <Button variant="contained" onClick={handleLogout}>
            Log Out
          </Button>
        </Link> */}
      </Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Your Final Score
      </Typography>
      <TableContainer component={Paper} sx={{ width: "80%", mb: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          {/* <TableHead>
            <TableRow>

              <TableCell>Total Quiz Score</TableCell>
              <TableCell>My Total Score</TableCell>
              <TableCell>Total Correct Answer</TableCell>
              <TableCell>Total Wrong Answer</TableCell>
              <TableCell>Total Questions</TableCell>
              <TableCell>Total Questions Attempted</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {leaderboardData.map((item, index) => (
              <React.Fragment key={index}>
                <Typography variant="subtitle1">{`Total Quiz Score: ${item.totalQuizScore}`}</Typography>
                <Typography variant="subtitle1">{`My Total Score: ${item.myTotalScore}`}</Typography>
                <Typography variant="subtitle1">{`Total Correct Answer: ${item.totalCorrectAnswer}`}</Typography>
                <Typography variant="subtitle1">{`Total Wrong Answer: ${item.totalWrongAnswer}`}</Typography>
                {/* <Typography variant="subtitle1">{`Total Questions: ${item.totalQuestions}`}</Typography> */}
                <Typography variant="subtitle1">{`Total Questions Attempted: ${item.totalQuestionsAttempted}`}</Typography>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
};

export default Submit;