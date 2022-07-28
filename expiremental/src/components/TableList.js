import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function TableList(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(props.keyspace);
	const [list, setList] = useState([]);
	const [columnDefs] = useState([{field:'tables'}]);
	const [clicked, setClicked] = useState([]);

	let navigate = useNavigate();

	useEffect(() => {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables'
		axios.get(query)
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

	function clickedElement(table, index) {
		if(clicked[index])
			return (<li key={index}><Button variant="contained" onClick={() => {
				const items = clicked.map(item => item);
				items[index] = false;
				console.log(items);
				setClicked(items);
				console.log(clicked);}}>{table}
				{navigate(`/${keyspace}/${table}`, { replace: true })}
			</Button>
				
			</li>);
		else
			return (<li key={index}><Button variant="contained" onClick={() => {
				const items = clicked.map(item => item);
				items[index] = true;
				console.log(items);
				setClicked(items.map(item => item));
				console.log(clicked);}}>{table}</Button></li>);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {
		return (
			<ul>
				{list.map((table, index) => (
				clickedElement(table, index)
				))}
			</ul>
	);
	  }
	}


export default TableList;