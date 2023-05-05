import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
    const navigate = useNavigate();
    const checkToken = localStorage.getItem("token")

    useEffect(() => {
        if (checkToken) {
            navigate('/dashboard', { replace: true });
        }
    }, [checkToken]);

    return (
        <div className="about-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1 className="text-white font-weight-bold">About Us</h1>
                        <p className="text-white font-weight-bold">
                        Welcome to quiz platform - the ultimate destination for all your tech-related quiz needs. We offer a comprehensive solution that allows quiz organizers to create and manage quizzes with ease, and quiz takers to participate in quizzes and track their progress.
                        </p>
                        <p className="text-white font-weight-bold">
                        Organizers can easily create and manage quizzes, including setting deadlines and time limits for each question. Multiple-choice questions and dynamic tags are also available. Participants can register and take quizzes at their convenience, with access to a timer and a leaderboard displaying the highest scores. Progress tracking and quiz history are available for participants. The dashboard displays all ongoing quizzes for easy navigation. Join now for a seamless and enjoyable quiz-taking experience.
                        </p>

                        <Link to="/signUp">
                            <Button className="btn-lg btn-primary mt-4 fancy-button">Sign up now!</Button>
                        </Link>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;
