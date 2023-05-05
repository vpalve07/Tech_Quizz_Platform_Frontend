import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgetPass from './components/ForgetPass';
import ResetPass from './components/ResetPass';
import Dashboard from "./components/Dashboard";
import CreateQuiz from "./components/CreateQuiz"
import UpdateQuiz from "./components/UpdateQuiz"
import AddQuestions from "./components/AddQuestions"
import GiveAns from "./components/GiveAns"
import Leaderboard from "./components/Leaderboard";
import UserQuizzes from "./components/UserQuizzes"
import OrgQuizzes from "./components/OrgQuizzes"
import OngoingQuizzes from "./components/OngoingQuizzes"
import StartQuiz from "./components/StartQuiz"
import Submit from "./components/Submit"
import Navbar from "./components/Navbar"
import UserDetails from "./components/UserDetails"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"

import { useState } from "react";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
          <Navbar/>
          <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgotPass" element={<ForgetPass />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<CreateQuiz />} />
          <Route path="/updateQuiz/:quizId" element={<UpdateQuiz />} />
          <Route path="/leaderboard/:quizId" element={<Leaderboard />} />
          <Route path="/userQuizzes" element={<UserQuizzes />} />
          {/* <Route path="/organizerQuizzes" element={<OrgQuizzes />} />
          <Route path="/ongoingQuizzes" element={<OngoingQuizzes />} /> */}
          <Route path="/question" element={<GiveAns />} />
          <Route path="/startQuiz" element={<StartQuiz />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/quizQue/:quizId"
            element={<AddQuestions/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
