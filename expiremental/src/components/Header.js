/************************************************************
 * Header.js codes for the formatting and the functionality
 * of the header of the website. Refer to any additional
 * comments for details about the code.
 * 
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 * 
 * Last updated: 8/3/2022
 ***********************************************************/

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Box, Toolbar, Typography, Container, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Header(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const theme = createTheme();
    theme.typography.nav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: '1rem',
        fontWeight: 'bold',
        '@media (min-width:580px)': {
            fontSize: '1.3rem',
            fontWeight: 'medium'
        },
        '@media (min-width:690px)': {
            fontSize: '1.7rem',
            fontWeight: "medium"
        }
    };
    theme.typography.sidenav = {
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        fontSize: '11px',
        fontWeight: 1000,
        '@media (min-width:510px)': {
            fontSize: '12px',
            fontWeight: 1000
        },
        '@media (min-width:580px)': {
            fontSize: '14px',
            fontWeight: 800,
        },
        '@media (min-width:690px)': {
            fontSize: '15px',
            fontWeight: 7000,
        }
    };
    
    return (
        <AppBar position="static">
            <Toolbar variant="dense" disableGutters>
                <ThemeProvider theme={theme}>
                    <Button href="/" sx={{ ml: '15px' }}>
                        <Box
                            component="img"
                            sx={{
                                height: 65,
                                width: 65,
                            }}
                            alt="Chase Logo"
                            src="https://go.distance.ncsu.edu/gd203/wp-content/uploads/2020/04/704a1e534e8dc0138eee3ded449555d5-860x860.png"
                        />
                    </Button>
                    <Container align='left' sx={{ml:'0px'}}>
                        <Typography href="/"
                            variant="nav"
                            color="inherit"
                            component="a"
                            align='left'
                            sx={{ ml: '0px', textDecoration: 'none', pr: '0px' }}>
                                JP MORGAN CHASE & CO.
                        </Typography>
                    </Container>
                    {props.loginStatus &&
                        <Stack direction='row'>
                            <Button color='inherit' id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                                <Typography variant="sidenav" color="inherit" component="div" align='center' sx={{}}>
                                    <Box fontWeight="700" sx={{ width: '.5 rem' }}>
                                        Dashboard
                                    </Box>
                                </Typography>
                            </Button>
                            <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Button href="/" sx={{ fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>
                                        View Dashboard
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button href="/keyspaces" sx={{ fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>
                                        Data Center
                                    </Button>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Button href="/cluster" sx={{ fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>
                                        Cluster Info
                                    </Button>
                                </MenuItem>
                            </Menu>                
                            <Button
                                href="/"
                                onClick={() => {
                                    props.onLog('false');
                                    localStorage.setItem('isLoggedIn', 'false');
                                }}
                                color='inherit'
                                sx={{
                                    mr: "20px",
                                    fontFamily: [
                                        'Open Sans',
                                        'sans-serif'
                                    ].join(',')
                                }}>
                                <Typography variant="sidenav" color="inherit" component="div" align='left' sx={{ ml: '0px' }}>
                                    <Box fontWeight="700" sx={{
                                        width: '58px',
                                        '@media (min-width:510px)': {
                                            width: '63px',
                                        },
                                        '@media (min-width:580px)': {
                                            width: '67px',
                                        },
                                        '@media (min-width:690px)': {
                                            width: '72px',
                                        },
                                        textAlign:'center'}}>
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
