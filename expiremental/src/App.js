import { React, useState } from 'react';
import './App.css';
import KeyspaceList from './components/KeyspaceList2';
import Table from './components/Table';
import { blue, grey } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import ErrorPage from './components/Error';
import { Box } from '@mui/material';

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
        <div >
            <style>{'body {background-color: darkgray;}'}</style>
        <ThemeProvider theme={theme}>
                <div><Header loginStatus={isLoggedIn === 'true'} onLog={(value) => setIsLoggedIn(value)} /></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/login" />} />
                        <Route path="/login" element={<Login onLog={(value) => setIsLoggedIn(value)} />} />
                        <Route path="/dashboard" element={isLoggedIn === 'true' ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/keyspaces" element={isLoggedIn === 'true' ? <KeyspaceList /> : <Navigate to="/login" />} />
                        <Route path="/:keyspaceName/:tableName" element={isLoggedIn === 'true' ? <Table /> : <Navigate to="/login" />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>

                </BrowserRouter>
            
            </ThemeProvider>
            </div>
        
    );
  
}

export default App;