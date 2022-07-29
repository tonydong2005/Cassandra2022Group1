import React from 'react';
import './App.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import KeyspaceList from './components/KeyspaceList';
import Header from './components/Header';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
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
                <Table/>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Container>
            </ThemeProvider>
  );
}

export default App;
