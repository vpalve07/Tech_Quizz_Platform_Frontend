import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import OrgQuizzes from './OrgQuizzes'
import OngoingQuizzes from './OngoingQuizzes'

const mdTheme = createTheme();

const styles = {
  container: {
    // backgroundImage: "url('https://www.investintech.com/resources/blog/wp-content/uploads/2021/09/Tech-Quiz-Test-Your-Knowledge-While-Having-Fun.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0
  },
  button: {
    position: 'absolute',
    top: 20,
    right: 20
  }
};

const Container = styled('div')(styles.container);
const LogoutButton = styled(Button)(styles.button);

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userData,setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // define isLoggedIn and setIsLoggedIn here

  useEffect(() => {
    if (!token) {
      navigate('/signIn', { replace: true });
    }
  }, [token]);

  useEffect(() => {
    const type = localStorage.getItem('userData')
    if(type){
    setUserData(JSON.parse(type).type)
  }
  },[])
  
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
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Container>
        {
         userData && userData === "organizer"? <OrgQuizzes/>:<OngoingQuizzes/>
        }
      </Container>
    </ThemeProvider>
  );
}
