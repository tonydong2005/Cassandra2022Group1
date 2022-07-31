import { React, Component, useState, useEffect, useRef } from 'react';
import './App.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Keyspaces from './pages/keyspaces';
import Header from './components/Header';
//decide between LoginT and LoginN and then rename the file we use to login.js
import LoginT from './pages/tejaslogin';
import LoginN from './pages/nityalogin';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import Tables from './components/Tables';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate, Link} from "react-router-dom";
import Dashboard from './pages/dashboard';

const theme = createTheme({
    palette: {
      primary: {
        main: blue[700],
      },
    },
  });


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*  useEffect(() => {
        const loginStat = window.localStorage.getItem('loginStatus');
        console.log(loginStat);
        setIsLoggedIn(JSON.parse(loginStat));
    }
    );
    useEffect(() => {
        window.localStorage.setItem('loginStatus', JSON.stringify(isLoggedIn));
    }
    );*/
   if (isLoggedIn) {
    console.log("Nitya - " + isLoggedIn);

        return (
            <ThemeProvider theme={theme} > 
                <Header loginStatus={true} onLog={(value) => setIsLoggedIn(value)} />
              
                  <Router>
                    <Routes> 
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/keyspaces" element={<Keyspaces />} /> 


                    </Routes>
                  </Router>
    


            </ThemeProvider>
        );
    }
    else {
      console.log("Nitya - " + isLoggedIn);
      return (
            <ThemeProvider theme={theme} >
                <Header loginStatus={false} onLog={(value) => setIsLoggedIn(value)} />
                    <LoginT onLog={(value) => setIsLoggedIn(value)} />
                    
                    // history.entries = [];
                    // history.index = -1;
                    {/* history.push(`/`);
                    history.go(-1); */}
                    <Router>
                    <Routes> 
                    <Route path="/keyspaces" element={<Dashboard />} /> 

                  </Routes>
                  </Router>

            </ThemeProvider>
        );

    }

  
    /*return (
      <ThemeProvider theme={theme} >
      <Header/>
      <Container maxWidth = 'lg' sx = {{mt: '25px', mb: '10px'}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography sx = {{fontSize: 18}}> Keyspaces </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <KeyspaceList/>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Container maxWidth = 'lg' sx = {{mt: '18px', mb: '10px'}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx = {{fontSize: 18}}>Ur Mom</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx = {{mt: '0px', mb: '10px'}}>
              Tables
            </Typography>
            <Accordion sx={{background: '#D7E5F0'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>lmao XD</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Tables/>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Container>
            </ThemeProvider>
  );*/
}

export default App;
