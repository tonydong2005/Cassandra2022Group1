import { React, Component, useState, useEffect, useRef } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, Container } from '@material-ui/core';
import Header from "../components/Header"; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { spacing } from '@mui/system';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
});

const Login = props => {
    console.log(props);
    const paperStyle={padding :30,height:400,width:700, margin:"125px auto"}
    const avatarStyle={backgroundColor: blue[700], margin:'20px 0', padding:10}
    const btnstyle={margin:'30px 0',padding:10}
    const user = {margin:"15px 0"}
    return (
        <ThemeProvider theme={theme} >
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2 id="login">Log In</h2>
                </Grid>
                <TextField style={user} label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                {/*<FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                {*/}
                <Button onClick={() => {
                //authorization stuff to make sure info is right, if logged in successfully...
                props.onLog(true)
                }}
                type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Log in </Button>
                {/*}
                <Typography >
                     <Link href="#" >
                        Forgot password?
                     </Link>
                    </Typography>
                <Typography > Do you have an account? {" "}
                     <Link href="#" >
                        Sign Up 
                    </Link>
                </Typography>
                {*/}
            </Paper>
        </Grid>
       
        
        </ThemeProvider>
        );

}

export default Login;