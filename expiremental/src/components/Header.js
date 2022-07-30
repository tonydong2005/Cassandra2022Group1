import React from 'react';
import { Link } from 'react-router';
import { AppBar, Box, Toolbar, Typography, Container, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Header(props) {
    console.log(props);
    const theme = createTheme();
    theme.typography.nav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '1.7rem',
        },
        //[theme.breakpoints.up('md')]: {
        //    fontSize: '1 rem',
        //}
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
                    <Container align='center'>
                        
          <Typography variant = "nav" color = "inherit" component = "div" align = 'center' sx = {{ ml: '10px'}}>
                            <Box fontWeight="1000">
                                JP MORGAN CHASE & CO.
                            </Box>
                            
                        </Typography>
                        
                    </Container>
                    {props.loginStatus && <Stack direction='row' >
                        <Button color='inherit' sx={{
                            fontFamily: [
                                'Open Sans',
                                'sans-serif'
                            ].join(',')
                        }}>Keyspaces</Button>
                        <Button
                            onClick={() => {
                                props.onLog(false)
                            }}
                            color='inherit' sx={{
                            fontFamily: [
                                'Open Sans',
                                'sans-serif'
                            ].join(',')
                        }}>Sign Out</Button>
                    </Stack>}
                    
                </ThemeProvider>
        </Toolbar>
      </AppBar>
  )
}

export default Header;