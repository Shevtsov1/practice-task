import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const SignIn = () => {


    const email = useRef();
    const password = useRef();
    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const navigate = useNavigate();

    const handleSignIn = () => {
        const currentUser = userList.find(user => user.userData.email === email.current.value && user.userData.password === password.current.value);

        if (currentUser) {
            // Mark the current user as logged in
            currentUser.userData.loggedIn = true;

            // Update the user list in local storage
            localStorage.setItem("userList", JSON.stringify(userList));

            navigate("/home");
        } else {
            alert("Please enter valid credentials.");
        }
    }

    const handleGoToSignUp = () => {
        navigate("/SignUp");
    }

    return (
        <div className="sign-in">
            <div className="container-md">
                <h1>Sign In</h1>
                <div className="form-floating">
                    <input type="email" className="form-control validate" id="floatingInput"
                           placeholder="name@example.com" ref={email}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control validate" id="floatingPassword"
                           placeholder="Password" autoComplete="none" ref={password}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="submit-btn">
                    <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
                </div>
                <p className="have-account-text">Don't have an account?
                    <Button variant="text" onClick={handleGoToSignUp}>Register!</Button>
                </p>
            </div>
        </div>
    );
};

export default SignIn;