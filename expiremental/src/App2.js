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
import ViewTable from './pages/viewTable';



const theme = createTheme({
    palette: {
      primary: {
        main: blue[700],
      },
    },
  });


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

    return (
        <ThemeProvider theme={theme} >
            <Header loginStatus={isLoggedIn==='true'} onLog={(value) => setIsLoggedIn(value)} />
            <Router>
                <Routes>

                    <Route path="/" element={<Navigate replace to="/login" />} >

                    </Route>

                    <Route path="/login" element={<Login onLog={(value) => setIsLoggedIn(value)}/>}>
                    </Route>

                    <Route path="/dashboard" element={isLoggedIn === 'true' ? <Dashboard /> : <Navigate to="/login" />}>
                    </Route>

                    <Route path="/keyspaces" element={isLoggedIn === 'true' ? <Keyspaces /> : <Navigate to="/login" />}>
                    </Route>

                    <Route path="/viewTable" element={isLoggedIn === 'true' ? <ViewTable /> : <Navigate to="/login" />} />

                    <Route path="*" element={<ErrorPage/>}>
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
  );
}

export default App;
