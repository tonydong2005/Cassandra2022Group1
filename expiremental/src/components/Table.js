import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { default as Bruhmoment } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Table(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(useParams().keyspaceName);
    const [table, setTable] = useState(useParams().tableName);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);

	let navigate = useNavigate();

	useEffect(() => {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/rows'
		axios.get(query)
		.then(
			(result) => {
			setIsLoaded(true);
			setRows(result.data);
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


    useEffect(() => {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/columnNames'
		axios.get(query)
		.then(
			(result) => {
			setIsLoaded(true);
			setCols(result.data);
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
    console.log("hi");
    console.log(props);
    console.log(keyspace + table);
    console.log(rows);
    console.log(columns);

	if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {
		const colsFormatted = [];
		const rowsFormatted = [];
        columns.forEach((column, index) => colsFormatted.push({field: column}));
        console.log(props);
		
		rows.forEach(row => {
			const temp = {};
            for (let i = 0; i < columns.length; i++) {
                temp[columns[i]] = row[i];
			}
			rowsFormatted.push(temp);
		});
        
		console.log(colsFormatted);
		console.log(rowsFormatted);
		return (
			<div id="myGrid" className="ag-theme-alpine" style={{height: 400, width: 600}}>
				<AgGridReact
				rowData={rowsFormatted}
				columnDefs={colsFormatted}>

				</AgGridReact>
				<Button variant="contained" onClick={() => {
					{navigate(`/`, { replace: true })}
				}}>bacc
				
			</Button>
			</div>
			
		);
	  }
	}


export default Table;