import React, { Component } from 'react';
import './App.css';
import {AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import { blue } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import KeyspaceList from './components/KeyspaceList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Table from './components/Table';

const theme = createTheme({
    palette: {
      primary: {
        main: blue[700],
      },
    },
  });  


function App() {
  
    return (
        <ThemeProvider theme={theme}>
                                          <AppBar position="static">
                                  <Toolbar variant="dense">
                                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" component="div">
                                      Photos
                                    </Typography>
                                  </Toolbar>
                                </AppBar>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<KeyspaceList/>} exact={true} />
                  <Route path="/:keyspaceName/:tableName" element={<Table />} exact={true} />
                </Routes>
                
            </BrowserRouter>
        </ThemeProvider>
        
    );
  
}

export default App;