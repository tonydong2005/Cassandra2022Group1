import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import KeyspaceList from "./KeyspaceList";
import Dashboard from "./Dashboard";
import "./styles.css";
import axios from "axios";
import {Navigate} from "react-router-dom";


function Login() {
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
    uname: "invalid username",
    pass: "invalid password"
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
        <Button varient="contained" input type="submit"> Submit </Button>
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
      
  {localStorage.getItem('isLoggedIn')==='true' ?

  <Navigate replace to='/dashboard'/>

  : renderForm}
      </div>
    </div>
    
  );
}

export default Login;