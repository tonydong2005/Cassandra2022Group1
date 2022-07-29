import React from 'react';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import chaseLogo from 'chaselogo-removebg-preview.png'

function Header() {
    const theme = createTheme();
    theme.typography.nav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        }
    };
    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box
            component="img"
            sx={{
            height: 65,
            width: 65,
            }}
            alt="Chase Logo"
            src="https://go.distance.ncsu.edu/gd203/wp-content/uploads/2020/04/704a1e534e8dc0138eee3ded449555d5-860x860.png"
          />
          <ThemeProvider theme={theme}>
            <Container align = 'center'>
              <Typography variant = "nav" color = "inherit" component = "div">
                <Box fontWeight="1000">
                  JP MORGAN CHASE & CO.
                </Box>
              </Typography>
            </Container>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
  )
}

export default Header;