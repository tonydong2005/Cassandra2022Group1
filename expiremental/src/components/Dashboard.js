import { React, Component, useState, useEffect, useRef } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Container } from '@mui/material';
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
          fontWeight: 300,
          fontSize: 30
        },
        textbody: {
            fontStyle: 'italic',
        }
      },
});

const Dashboard = props => {
    const navigate=useNavigate();

    const paperStyle = { padding: 30, height: 100, width: "50%", margin: "40px auto"}
    const avatarStyle = { backgroundColor: blue[700], margin: '20px 0', padding: 10 }
    const btnstyle = { backgroundColor: blue[700], color: '#fff', borderRadius: 35, fontSize: '15px', marginBottom: 20}
    const user = { margin: "15px 0" }
    return (
    
        <ThemeProvider theme={theme} >
            <ThemeProvider theme={theme.typography} >
              <Container align = 'center'>
                <Typography variant="h1" align='center' marginTop={4}>
                        Welcome
                </Typography>
                <Typography marginTop = '10px' align='center'>
                 This is your homepage. You can access your Data Center or Metrics. 
                </Typography>
              </Container>
            </ThemeProvider> 
            
            <Grid>                
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