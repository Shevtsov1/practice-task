import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const SignUp = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleReg = () => {
        if (username.current.value && email.current.value && password.current.value) {
            // Get the current user list from local storage
            const userList = JSON.parse(localStorage.getItem("userList")) || [];

            // Create a new user object
            const userId = userList.length + 1;
            const userData = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                loggedIn: false
            }

            // Add the new user to the user list
            userList.push({ userId, userData });

            // Save the updated user list to local storage
            localStorage.setItem("userList", JSON.stringify(userList));

            navigate("/SignIn");
        }
    }

    const handleGoToSignIn = () => {
        navigate("/SignIn");
    }

    return (
        <div className="sign-up">
            <div className="container">
                <h1>Sign Up</h1>
                <div className="form-floating">
                    <input type='text' className="form-control" id="floatingUsername"
                           placeholder="Username" autoComplete="none" ref={username} />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail"
                           placeholder="name@example.com" autoComplete="none" ref={email} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"
                           placeholder="Password" autoComplete="none" ref={password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="submit-btn">
                    <Button variant="contained" onClick={handleReg}>Sign Up</Button>
                </div>
                <p className="have-account-text">Have an account?
                    <Button variant="text" onClick={handleGoToSignIn}>Login!</Button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;