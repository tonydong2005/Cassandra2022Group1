import { React, Component, useState, useEffect, useRef } from 'react';
import './App.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Keyspaces from './pages/keyspaces';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
//decide between LoginT and LoginN and then rename the file we use to login.js
import LoginT from './pages/tejaslogin';
import LoginN from './pages/nityalogin';
import Login from './pages/login';
import ErrorPage from './pages/error';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import Tables from './components/Tables';


const theme = createTheme({
    palette: {
      primary: {
        main: blue[700],
      },
    },
  });


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

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
   /*if (isLoggedIn) {
        return (
            <ThemeProvider theme={theme} > 
                <Header loginStatus={true} onLog={(value) => setIsLoggedIn(value)} />
                    <Keyspaces />
            </ThemeProvider>
        );
    }
    else {
        return (
            <ThemeProvider theme={theme} >
                <Header loginStatus={false} onLog={(value) => setIsLoggedIn(value)} />
                    <LoginT onLog={(value) => setIsLoggedIn(value)} />
            </ThemeProvider>
        );

    }*/

    return (
        <ThemeProvider theme={theme} >
            <Header loginStatus={isLoggedIn==='true'} onLog={(value) => setIsLoggedIn(value)} />
            <Router>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Routes>

                    <Route path="/" element={<Navigate replace to="/login" />} >

                    </Route>

                    <Route path="/login" element={<Login onLog={(value) => setIsLoggedIn(value)}/>}>
                    </Route>

                    <Route path="/dashboard" element={isLoggedIn === 'true' ? <Dashboard /> : <Navigate to="/login" />}>
                    </Route>

                    <Route path="/keyspaces" element={isLoggedIn === 'true' ? <Keyspaces /> : <Navigate to="/login" />}>
                    </Route>*

                    <Route path="*" element={<ErrorPage/>}>
                    </Route>*

                    {/*<Route path="/tabledisplay" element={<TableDisplay />}>
                    </Route>*/}

                </Routes>
            </Router>
        </ThemeProvider>
  );
}

export default App;
