import React from "react";
import { BiAbacus, BiLaptop, BiGlobe, BiHeart, BiPhone } from 'react-icons/bi';
import "../css/styles.css";
import { NavLink } from "react-router-dom";

function CreativeTheme() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                {/* <div class="container px-4 px-lg-5"> */}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="navbar-brand" to="/">Tech Quizz</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signUp">SignUp</NavLink>
                        </li>
                        <li class="nav-item"><NavLink className="nav-link" to="/signIn">SignIn</NavLink></li>
                        <li class="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
                        <li class="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </ul>
                </div>
                {/* </div> */}
            </nav>
            <header class="masthead">
                <div class="container px-4 px-lg-5 h-100">
                    <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div class="col-lg-8 align-self-end">
                            <h1 class="text-white font-weight-bold">Your Online Destination for Tech-related Quizzes</h1>
                            <hr class="divider" />
                        </div>
                        <div class="col-lg-8 align-self-baseline">
                            <p class="text-white-75 mb-5">Introducing Tech Quizz: The Ultimate Platform for Creating and Taking Quizzes on Tech-related Topics so Test your knowledge and challenge yourself with our exciting quizzes on Tech Quizz!</p>
                            <NavLink className="nav-link d-inline-block" to="/signUp"><button className="btn btn-primary btn-xl">SignUp</button></NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
                            <NavLink className="nav-link d-inline-block" to="/signIn"><button className="btn btn-primary btn-xl">SignIn</button></NavLink>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
};

export default CreativeTheme;