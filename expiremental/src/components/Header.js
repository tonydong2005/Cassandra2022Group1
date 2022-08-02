import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Navigate } from "react-router-dom";
import { Link } from '@mui/material';
import { AppBar, Box, Toolbar, Typography, Container, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SettingsInputComponent } from '@mui/icons-material';
//import chaseLogo from 'chaselogo-removebg-preview.png'

function Header(props) {
    console.log(props);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        localStorage.setItem('isLoggedIn', 'false');

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
        },
      //  [theme.breakpoints.up('md')]: {
      //      fontSize: '.5 rem',
      //  }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
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
                    {/*<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* {settings.map((setting) => (
                <MenuItem  component={Link} to="/" key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                  href='/'
                  textAlign="center"
                  >
                  Log Out
                  </Typography>
                </MenuItem>
              ))}
                        </Menu>
                    </Box> */}
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
                                <Button href="/">
                                  View Dashboard
                                </Button>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <Button href="/keyspaces">
                                  Data Center
                                </Button>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <Button>
                                  Metrics
                                </Button>
                              </MenuItem>
                            </Menu>                
                        <Button
                            href="/"
                                    onClick={() => {
                                        props.onLog('false');
                                        localStorage.setItem('isLoggedIn', 'false');
                                    }}
                            color='inherit' sx={{
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
