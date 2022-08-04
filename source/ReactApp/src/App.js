/************************************************************
 * App.js codes for the routing and pathing of the website.
 * Refer to any additional comments for details about the
 * code.
 * 
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 * 
 * Last updated: 8/3/2022
 ***********************************************************/

import { React, useState } from 'react';
import './App.css';
import KeyspaceList from './components/KeyspaceList';
import Table from './components/Table';
import { blue, grey } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import ErrorPage from './components/Error';
import ClusterInfo from './components/ClusterInfo';

const theme = createTheme({
    palette: {
      primary: {
        main: blue[700]
      },
    },
    
  });  


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

    return (
        <div >
          
        <ThemeProvider theme={theme}>
                <div><Header loginStatus={isLoggedIn === 'true'} onLog={(value) => setIsLoggedIn(value)} /></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/login" />} />
                        <Route path="/login" element={<Login onLog={(value) => setIsLoggedIn(value)} />} />
                        <Route path="/dashboard" element={isLoggedIn === 'true' ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/keyspaces" element={isLoggedIn === 'true' ? <KeyspaceList /> : <Navigate to="/login" />} />
                        <Route path="/cluster" element={isLoggedIn === 'true' ? <ClusterInfo /> : <Navigate to="/login" />} />
                        <Route path="/:keyspaceName/:tableName" element={isLoggedIn === 'true' ? <Table /> : <Navigate to="/login" />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>

                </BrowserRouter>
            
            </ThemeProvider>
            </div>
        
    );
  
}

export default App;