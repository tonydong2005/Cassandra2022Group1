/************************************************************
 * Login.js codes for the login page of the website. Refer to
 * any additional comments for details about the code.
 * 
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 * 
 * Last updated: 8/3/2022
 ***********************************************************/

import { React,  useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
});

function Login(props) {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const paperStyle = { padding: 30, height: 500, width: "50%", margin: "125px auto" };
    const avatarStyle = { backgroundColor: blue[700], margin: '20px 0', padding: 10 };
    const btnstyle = { margin: '30px 0', padding: 10 };
    const user = { margin: "15px 0" };

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

    // Error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error" style={{color:'red'}}>{errorMessages.message}</div>
        );

    // Login form
    const renderForm = (
        <ThemeProvider theme={theme} >
            <Grid>
                <Paper elevation={5} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2 id="login">Log In</h2>
                    </Grid>
        <div className="form" >
            <form onSubmit={handleSubmit}>
                <div align='center' className="input-container">    
                                <TextField style={user} id="standard-basic" placeholder= 'Enter username' label="Username" variant="outlined" type="text" name="uname" fullWidth required />
                    {renderErrorMessage("uname")}
                </div>
                <div align='center' className="input-container">
                                <TextField id="standard-basic" label="Password" placeholder='Enter password' variant="outlined" type="password" name="pass" fullWidth required />
                    {renderErrorMessage("pass")}
                </div>
                <div align='center'>
                    <Button 
                         color='primary' variant="contained" input style={btnstyle} type="submit" fullWidth > Log In </Button>
                </div>
            </form>
                    </div>
                    </Paper>
                </Grid>
            </ThemeProvider>
    );

    return (
        <div align='center' className="app">
            <div >
                {localStorage.getItem('isLoggedIn') === 'true' ?

                    <Navigate replace to='/dashboard' />

                    : renderForm}
            </div>
        </div>

    );
}

export default Login;