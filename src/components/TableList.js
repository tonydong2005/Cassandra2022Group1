import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import KeyspaceList from './KeyspaceList';


function TableList(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(props.keyspace);
	const [list, setList] = useState([]);
	const [columnDefs] = useState([{field:'tables'}])


	useEffect(() => {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables'
		axios.get(query)
		.then(
			(result) => {
			setIsLoaded(true);
			console.log(result.data)
			setList(result.data);
			},
			// Note: it's important to handle errors here 
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
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
		const listFormatted = [];
		list.forEach((tables, index) => listFormatted.push(				
			<ListItemButton sx={{ pl: 4 }}>
		  	<ListItemIcon>
				<StarBorder />
		  </ListItemIcon>
		  <ListItemText primary={tables} />
		</ListItemButton>
  ));
  //listFormatted.push({tables})
		console.log(listFormatted);
		return (
			<List component="div" disablePadding>
		<ListSubheader component="div" id="nested-list-subheader">
          Tables
        </ListSubheader>
			{listFormatted}
			</List>
			/*<div id="myGrid" className="ag-theme-alpine" style={{height: 400, width: 600}}>
				<AgGridReact
				rowData={listFormatted}
				columnDefs={columnDefs}>

				</AgGridReact>
			</div>*/
			// <ul>{listFormatted}</ul>
		);
	  }
	}


export default TableList;