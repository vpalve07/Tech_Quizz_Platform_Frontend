import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
    const navigate = useNavigate();
    const checkToken = localStorage.getItem("token")

    useEffect(() => {
        if (checkToken) {
            navigate('/dashboard', { replace: true });
        }
    }, [checkToken]);

    return (
        <div className="contact-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1 className="text-white font-weight-bold">Contact Us</h1>
                        <p className="text-white font-weight-bold">Feel free to get in touch with us using the contact information below.</p>
                        <Row>
                            <Col md={6} className="mb-4 mb-md-0">
                                {/* <div className="contact-card"> */}
                                <i className="fas fa-envelope fa-3x mb-4"></i>
                                <h4 className="text-white font-weight-bold mb-4">Email</h4>
                                <a href="mailto:youremail@gmail.com">vinayak.palve02@gmail.com</a>
                                {/* </div> */}
                            </Col>
                            <Col md={6}>
                                {/* <div className="contact-card"> */}
                                <i className="fas fa-phone fa-3x mb-4"></i>
                                <h4 className="text-white font-weight-bold mb-4">Phone</h4>
                                <a href="tel:+917030182540">+917030182540</a>
                                {/* </div> */}
                            </Col>
                            <Link to="/">
                                <Button className="btn-lg btn-primary mt-4">Home</Button>
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contact;
