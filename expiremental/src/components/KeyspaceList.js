import React, { useState, useEffect } from 'react';
import TableList from './TableList';
import axios from 'axios';
import { Button } from '@mui/material';


function KeyspaceList() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [list, setList] = useState([]);
	const [clicked, setClicked] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:8080/api/keyspaces')
		.then(
			(result) => {
			setIsLoaded(true);
			setList(result.data);
			setClicked(Array(result.data.length).fill(false, 0, result.data.length))
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
			return (<li key={index}><Button variant="contained" onClick={() => {
				const items = clicked.map(item => item);
				items[index] = false;
				console.log(items);
				setClicked(items);
				console.log(clicked);}}>{keyspace}</Button>
			<TableList keyspace={keyspace}/></li>);
		else
			return (<li key={index}><Button variant="contained" onClick={() => {
				const items = clicked.map(item => item);
				items[index] = true;
				console.log(items);
				setClicked(items.map(item => item));
				console.log(clicked);}}>{keyspace}</Button></li>);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {
		return (
				<ul>
					{list.map((keyspace, index) => (
					clickedElement(keyspace, index)
					))}
				</ul>
		);
	  }
	}

export default KeyspaceList;