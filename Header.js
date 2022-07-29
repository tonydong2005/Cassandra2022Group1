import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
//import chaseLogo from 'chaselogo-removebg-preview.png'

function Header(){
  return(
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
          <Typography variant = "h4" color = "inherit" component = "div" align = 'center' sx = {{ ml: '10px'}}>
            JP Morgan Chase & Co
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Header;