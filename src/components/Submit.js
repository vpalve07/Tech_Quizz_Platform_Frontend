import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
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
        navigate("/signIn", { replace: true });
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
      navigate("/signIn");
      setIsLoggedIn(false);
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 4 }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 0, m: 2 }}>
      </Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Your Final Score
      </Typography>
      <TableContainer component={Paper} sx={{ width: "80%", mb: 4 }}>
        <Table sx={{ minWidth: 650 }}>
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