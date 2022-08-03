import { React, Component, useState, useEffect, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import KeyspaceList from '../components/KeyspaceList';
import Header from '../components/Header';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import Tables from '../components/Tables';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DescTable from '../components/ViewTable';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
});

function ViewTable() {
    return (
        <ThemeProvider theme={theme} >
          <Container align = 'center'>
            <DescTable></DescTable>
          </Container>
        </ThemeProvider>
    );
}

export default ViewTable;