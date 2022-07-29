import React, { useState, useEffect } from 'react';
import TableList from './TableList';
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function KeyspaceList() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [list, setList] = useState([]);
	const [clicked, setClicked] = useState([false, false, false, false, false, false, false]);
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
	function clickedElement(keyspace, index) {
		if(clicked[index])
			return (<Accordion sx={{background: '#D7E5F0'}}><AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => {
				const items = clicked.map(item => item);
				items[index] = false;
				console.log(items);
				setClicked(items);
				console.log(clicked);}}>{keyspace} </AccordionSummary>
			    <AccordionDetails><TableList keyspace={keyspace}/></AccordionDetails></Accordion>);
		else
			return (<Accordion sx={{background: '#D7E5F0'}}><AccordionSummary expandIcon={<ExpandMoreIcon />}><AccordionDetails onClick={() => {
				const items = clicked.map(item => item);
				items[index] = true;
				console.log(items);
				setClicked(items.map(item => item));
				console.log(clicked);}}>{keyspace}</AccordionDetails></AccordionSummary></Accordion>);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {
		return (
		  <>
		    {list.map((keyspace, index) => (
			  clickedElement(keyspace, index)
			))}
		  </>
		);
	  }
	}

export default KeyspaceList;