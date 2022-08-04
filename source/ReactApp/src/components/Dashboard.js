/************************************************************
 * Dashboard.js codes for the dashboard of the website. Refer
 * to any additional comments for details about the code.
 * 
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 * 
 * Last updated: 8/3/2022
 ***********************************************************/

import { React } from 'react';
import { Grid, Paper, Button, Typography, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
    typography: {
        h1: {
          fontWeight: 'bold',
            fontSize: 35,
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(',')
        },
        textbody: {
            fontStyle: 'italic',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(','),
            color: blue[900]
        }
      },
});

const Dashboard = props => { 
    const navigate = useNavigate();
    const paperStyle = { backgroundColor: blue[100], padding: 30, height: 100, width: "50%", margin: "40px auto"}
    const btnstyle = {
        backgroundColor: blue[700], color: '#fff', borderRadius: 35, fontSize: '15px', fontWeight: 'bold', fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),marginBottom: 20}

    return (
        <ThemeProvider theme={theme} >
            <ThemeProvider theme={theme.typography} >
                <Typography variant="h1" align='center' marginTop={5} marginBottom={3}>
                    Welcome
                </Typography>
                <Container align='center'>
                    <Typography variant="textbody" align='center'>
                        This is your dashboard. You can access your Data Center or Cluster Info.
                    </Typography>
                </Container>
            </ThemeProvider>
            <Grid sx = {{mt: '-15px'}}>
                <Paper elevation={2} style={paperStyle}>
                    <Button
                        onClick={() => navigate("/keyspaces")}
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth>
                            Data Center
                    </Button>
                    <Button
                        onClick={() => navigate("/cluster") }
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth>
                            Cluster Info
                    </Button>
                </Paper>
            </Grid>
        </ThemeProvider>
    );


}

export default Dashboard;
