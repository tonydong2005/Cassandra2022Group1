import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import KeyspaceList from "./KeyspaceList";



function Dashboard (){

    return(
        <div>
            <div align='center'> 
            <Typography
          variant="h2"
            sx={{
                // mr: 2,
                // display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            > 
Welcome Admin  
  </Typography>  
                <Typography
                    variant="h6"
                    sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                > 
                This is the homepage. You can access your Data Center or Metrics.
            </Typography>  
            </div>
      </div> 
    )
}

export default Dashboard;

  