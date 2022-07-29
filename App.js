import React from 'react';
import './App.css';
import { blue } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import KeyspaceList from './components/KeyspaceList';
import Header from './components/Header';
import { Container, Typography } from '@mui/material';
import Table from './components/Table'

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
      <Container maxWidth = 'lg'>
        <Typography sx = {{ fontSize: 22, mt: '18px', mb: '10px'}}>
          Keyspaces
        </Typography>
        <KeyspaceList/>
      </Container>
      <Container maxWidth = 'md' sx = {{mt: '18px', mb: '10px'}}>
        <Table/>
      </Container>
    </ThemeProvider>
  );
}

export default App;