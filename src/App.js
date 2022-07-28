import React, { useState } from 'react';
import './App.css';
import { blue } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import KeyspaceList from './components/KeyspaceList';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TableDisplay from './components/TableDisplay';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from "react-router-dom";


// import ListFormat from './components/ListFormat';

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
          <Header/>

    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>

        <Route path="/" element={<Navigate replace to="/login" />} >
          
          </Route>          

          <Route path="/login" element={<Login/>}>
          </Route>
         
          <Route path="/dashboard" element={<Dashboard />}>
          </Route>
         
          <Route path="/keyspacelist" element={<KeyspaceList />}>
          </Route>
         
          <Route path="/tabledisplay" element={<TableDisplay />}>
          </Route>
        
        </Routes>
    </Router>

        </ThemeProvider>
        
    );
  
}

export default App;