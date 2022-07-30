import React, { useState, useEffect } from 'react';
import TableList from './TableList';
import axios from 'axios';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
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



function KeyspaceList() {
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
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [])
	// function clickedElement(keyspace, index) {
	// 	if(clicked[index])
	// 		return (<li key={index}><Button variant="contained" onClick={() => {
	// 			const items = clicked.map(item => item);
	// 			items[index] = false;
	// 			console.log(items);
	// 			setClicked(items);
	// 			console.log(clicked);}}>{keyspace}</Button>
	// 		<TableList keyspace={keyspace}/></li>);
	// 	else
	// 		return (<li key={index}><Button variant="contained" onClick={() => {
	// 			const items = clicked.map(item => item);
	// 			items[index] = true;
	// 			console.log(items);
	// 			setClicked(items.map(item => item));
	// 			console.log(clicked);}}>{keyspace}</Button></li>);
	// }

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<List
				sx={{ margin: 'auto', width: '100%', maxWidth: '80%', bgcolor: 'background.paper' }}

			>
				<ListSubheader component="div" id="nested-list-subheader">
					Keyspaces
        </ListSubheader>
				{list.map((keyspace, index) => (
					<div key={index}>
						<ListItemButton onClick={() => handleClick(index)}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={keyspace} />
							{open[index] ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>

						<Collapse in={open[index]} timeout="auto" unmountOnExit>

							<TableList keyspace={keyspace} />
						</Collapse>
					</div>
				))}

			</List>
			// 	<ListItemButton>
			// 	<ListItemIcon>
			// 	  <SendIcon />
			// 	</ListItemIcon>
			// 	<ListItemText primary={keyspace} />
			//   </ListItemButton>
			// <ul>
			// 	{list.map((keyspace, index) => (
			// 	clickedElement(keyspace, index)
			// 	))}
			// </ul>
		);
	}
}

export default KeyspaceList;
