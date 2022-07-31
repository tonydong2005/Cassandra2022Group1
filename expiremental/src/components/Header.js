import React from 'react';
import { Link } from "react-router";
import { AppBar, Box, Toolbar, Typography, Container, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import chaseLogo from 'chaselogo-removebg-preview.png'

function Header(props) {
    console.log(props);
    const theme = createTheme();
    theme.typography.nav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
            fontSize: '1rem',
        '@media (min-width:580px)': {
            fontSize: '1.3rem',
        },
        '@media (min-width:690px)': {
            fontSize: '1.7rem',
        },
        //[theme.breakpoints.up('md')]: {
        //    fontSize: '1 rem',
        //}
    };
    theme.typography.sidenav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: '10px',
        '@media (min-width:510px)': {
            fontSize: '11px',
        },
        '@media (min-width:580px)': {
            fontSize: '13px',
        },
        '@media (min-width:690px)': {
            fontSize: '14px',
        },
      //  [theme.breakpoints.up('md')]: {
      //      fontSize: '.5 rem',
      //  }
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
                    <Container align='left' sx={{ml:'0px'}}>
                        
          <Typography variant = "nav" color = "inherit" component = "div" align = 'left' sx = {{ ml: '0px'}}>
                            <Box fontWeight="1000">
                                JP MORGAN CHASE & CO.
                            </Box>
                            
                        </Typography>
                        
                    </Container>
                    {props.loginStatus &&
                            <Stack direction='row'> 
                                <Button color='inherit'>
                                    <Typography variant="sidenav" color="inherit" component="div" align='left' sx={{ ml: '0px' }}>
                                <Box fontWeight="700" sx={{ width: '.5 rem', }}>
                                            Keyspaces
                                        </Box>
                                    </Typography>
                                </Button>
                                <Button
                                    onClick={() => {
                                        props.onLog(false)
                                    }}
                                    color='inherit' sx={{
                                    fontFamily: [
                                        'Open Sans',
                                        'sans-serif'
                                    ].join(',')
                                    }}>
                                    <Typography variant="sidenav" color="inherit" component="div" align='left' sx={{ ml: '0px' }}>
                                <Box fontWeight="700" sx={{
                                    width: '50px',
                                    '@media (min-width:510px)': {
                                        width: '55px',
                                    },
                                    '@media (min-width:580px)': {
                                        width: '62px',
                                    },
                                    '@media (min-width:690px)': {
                                        width: '67px',
                                    }, textAlign:'center'}}>
                                            Sign Out
                                        </Box>
                                    </Typography>
                                </Button> 
                            </Stack>
                        }
                        
                </ThemeProvider>
        </Toolbar>
      </AppBar>
  )
}

export default Header;