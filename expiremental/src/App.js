import React, { Component } from 'react';
import './App.css';
import { Button } from '@mui/material'
import { red } from '@mui/material/colors';
import { ThemeProvider , createTheme} from '@mui/system';
import KeyspaceList from './components/KeyspaceList';

const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
    },
  });  


function App() {
  
    return (
        <ThemeProvider theme={theme}>
            <KeyspaceList/>
        </ThemeProvider>
        
    );
  
}

export default App;