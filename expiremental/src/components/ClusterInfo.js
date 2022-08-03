/************************************************************
 * Dashboard.js codes for the cluster info page of the
 * website. Refer to any additional comments for details
 * about the code.
 * 
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 * 
 * Last updated: 8/3/2022
 ***********************************************************/

import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
    typography: {
        h1: {
            fontWeight: 'bold',
            fontSize: 35,
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(',')
        },
        textbody: {
            fontStyle: 'italic',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: [
                'Open Sans',
                'sans-serif'
            ].join(','),
            color: blue[900]
        }
    },
});

const Cluster = props => {
    
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
    const [clusterInfo, setClusterInfo] = useState([]);
    const navigate = useNavigate();
    const paperStyle = { backgroundColor: blue[100], padding: 30, height: 100, width: "50%", margin: "40px auto" }
    const avatarStyle = { backgroundColor: blue[700], margin: '20px 0', padding: 10 }
    const btnstyle = {
        backgroundColor: blue[700], color: '#fff', borderRadius: 35, fontSize: '15px', fontWeight: 'bold', fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','), marginBottom: 20
    }
    const user = { margin: "15px 0" }

    useEffect(() => {
		const query = 'http://localhost:8080/api/cluster'
		axios.get(query)
		.then(
			(result) => {
                console.log(result);
				setIsLoaded(true);
				setClusterInfo(result.data);
			},
			(error) => {
				setIsLoaded(true);
				setError(error);
			}
		)
	}, [])

    if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
        return (
            <ThemeProvider theme={theme} >
                <ThemeProvider theme={theme.typography} >
                    <Typography variant="h1" align='center' marginTop={5} marginBottom={3}>
                        Cluster Info
                    </Typography>
                    <Container align='center'>
                        <Typography variant="textbody" align='center'>
                            <Grid sx={{ mt: '-15px' }}>
                                <Paper elevation={2} style={paperStyle}>
                                    <div>
                                        Cluster Name: {clusterInfo[0]}
                                    </div>
                                    <div>
                                        Cluster Size: {clusterInfo[1]}
                                    </div>
                                    <Button variant="contained" startIcon={<ArrowBackIcon />} sx={{ my: '10px', mx: '5px', fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',')  }} onClick={() => {
						                { navigate(`/keyspaces`, { replace: true }) }
					                }}>
						                Back
					                </Button>
                                </Paper>
                            </Grid>
                        </Typography>
                    </Container>
                </ThemeProvider>
            </ThemeProvider>
        );
    }
}

export default Cluster;