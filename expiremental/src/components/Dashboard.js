import { React, Component, useState, useEffect, useRef } from 'react';
import { Grid, Paper, Avatar, TextField, Box, Button, Typography, Link, Container } from '@mui/material';
import Header from "../components/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { fontSize, spacing } from '@mui/system';
import { Navigate, useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
    typography: {
        h1: {
          fontWeight: 'bold',
            fontSize: 40,
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(',')
        },
        textbody: {
            fontStyle: 'italic',
            textAlign: 'center',
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(','),
            color: blue[700]
        }
      },
});

const Dashboard = props => {
    const navigate = useNavigate();
    const paperStyle = { backgroundColor: blue[100], padding: 30, height: 100, width: "50%", margin: "40px auto"}
    const avatarStyle = { backgroundColor: blue[700], margin: '20px 0', padding: 10 }
    const btnstyle = {
        backgroundColor: blue[700], color: '#fff', borderRadius: 35, fontSize: '15px', fontWeight: 'bold', fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),marginBottom: 20}
    const user = { margin: "15px 0" }
    return (

        <ThemeProvider theme={theme} >
            <ThemeProvider theme={theme.typography} >
                <Typography variant="h1" align='center' marginTop={5} marginBottom={3}>
                    Welcome
                </Typography>
                <Container align='center'>
                <Typography variant="textbody" align='center'>
                        This is your homepage. You can access your Data Center or Metrics.
                </Typography>
                    </Container>
            </ThemeProvider>

            <Grid sx = {{mt: '-15px'}}>
                <Paper elevation={2} style={paperStyle}>
                    {/* <Button onClick={() => <Navigate replace to='/keyspaces'/>} */}

                    <Button onClick={() => navigate("/keyspaces")}

                        type='submit' color='primary' variant="contained" style={btnstyle} fullWidth> Data Center </Button>


                    <Button onClick={() => {
                        //authorization stuff to make sure info is right, if logged in successfully...
                    }}
                        type='submit' color='primary' variant="contained" style={btnstyle} fullWidth> Metrics </Button>

                </Paper>
            </Grid>


        </ThemeProvider>
    );


}

export default Dashboard;
