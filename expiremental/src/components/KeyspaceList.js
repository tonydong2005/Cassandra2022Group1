/************************************************************
 * KeyspaceList.js codes for the formatting and the
 * functionality of the keyspace display page of the website.
 * Refer to any additional comments for details about the
 * code.
 * 
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 * 
 * Last updated: 8/3/2022
 ***********************************************************/

import React, { useState, useEffect } from 'react';
import { blue } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import TableList from './TableList';
import axios from 'axios';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Grid, Paper, Avatar, TextField, Box, Button, Typography, Link, Container } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import KeyIcon from '@mui/icons-material/Key';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
			textAlign: 'left',
			fontFamily: [
				'Open Sans',
				'sans-serif'
			].join(','),
			fontWeight: '1000',
			color: blue[900]
		}
	},
});
function KeyspaceList() {
	const liststyle = {
		fontSize: '15px', fontWeight: 'bold', fontFamily: [
			'Open Sans',
			'sans-serif'
		].join(','), 
	}
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [list, setList] = useState([]);
	//closed
	const [open, setOpen] = React.useState(new Array(list.length).fill(false, 0, list.length));
	//Index -> change state -> Open
	const handleClick = (index) => {
		const items = open.map(item => item);
		items[index] = !items[index];
		setOpen(items);
	};
	useEffect(() => {
		axios.get('http://localhost:8080/api/keyspaces')
			.then(
				(result) => {
					setIsLoaded(true);
					setList(result.data);
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
					<Typography variant="h1" align='center' marginTop={5} marginBottom={5}>
						Keyspaces
                </Typography>
			<List sx={{ margin: 'auto', width: '100%', maxWidth: '80%', bgcolor: blue[100] }}>				
				{list.map((keyspace, index) => (
					<div key={index}>
						<ListItemButton onClick={() => handleClick(index)}>
							<ListItemIcon>
								<KeyIcon sx={{color:blue[900]}}/>
							</ListItemIcon>
							<ListItemText primary={
								<Typography variant="textbody" align='left'>
									{keyspace}
                				</Typography>}
							/>
							{open[index] ? <ExpandLess sx={{color:blue[900]}}/> : <ExpandMore sx={{color:blue[900]}}/>}
						</ListItemButton>
						<Collapse in={open[index]} timeout="auto" unmountOnExit>
							<TableList keyspace={keyspace} />
						</Collapse>
					</div>
				))}
			</List>
				</ThemeProvider>
			</ThemeProvider>
		);
	}
}

export default KeyspaceList;
