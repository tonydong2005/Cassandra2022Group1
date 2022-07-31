//nitya put ur login thing here
import { React, Component, useState, useEffect, useRef } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { spacing } from '@mui/system';
import ReactDOM from "react-dom";
import KeyspaceList from "../components/KeyspaceList";
import Dashboard from "../components/Dashboard";
import "./styling/styles.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


function Login(props) {
    let navigate = useNavigate();
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "Invalid Username",
        pass: "Invalid Password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
                localStorage.setItem('isLoggedIn', 'true');
                props.onLog('true');
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form" >
            <form onSubmit={handleSubmit}>
                <div align='center' className="input-container">
                    <TextField id="standard-basic" label="Username" variant="outlined" type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div align='center' className="input-container">
                    <TextField id="standard-basic" label="Password" variant="outlined" type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                {/* <div className="button-container">
          <input type="submit" />
        </div> */}
                <div align='center'>
                    <Button 
                        variant="contained" input type="submit" > Submit </Button>
                </div>
            </form>
        </div>
    );

    return (
        <div align='center' className="app">
            <div >
                <Typography
                    variant="h2"
                    sx={{
                        // mr: 2,
                        // display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Sign In  </Typography>

                {localStorage.getItem('isLoggedIn') === 'true' ?

                    <Navigate replace to='/dashboard' />

                    : renderForm}
            </div>
        </div>

    );
}

export default Login;