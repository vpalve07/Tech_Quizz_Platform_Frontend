import React, { useEffect, useState } from 'react';

function QuizData() {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('quizId');
    navigate('/');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://example.com/api/quizData', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {quizData.map((quiz) => (
        <div key={quiz.quizId}>
          <h2>{quiz.quizId.quizName}</h2>
          <p>Quiz Type: {quiz.quizId.quizType}</p>
          <p>Time Limit: {quiz.quizId.timeLimit}</p>
          <p>Topic Tags: {quiz.quizId.topicTags.join(', ')}</p>
          <p>Total Score: {quiz.quizId.totalScore}</p>
          <p>Score: {quiz.score}</p>
        </div>
      ))}
    </div>
  );
}

export default QuizData;
