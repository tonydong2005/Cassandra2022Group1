import { React, Component, useState, useEffect, useRef } from 'react';
import { Button, Container } from '@mui/material';
import Header from "../components/Header"; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
});

const Login = props => {
    console.log(props);
    return (
        <ThemeProvider theme={theme} >
        <Button
            onClick={() => {
                //authorization stuff to make sure info is right, if logged in successfully...
                props.onLog(true)
            }}
                variant="contained"> Log In </Button>
        </ThemeProvider>
        );

}

export default Login;