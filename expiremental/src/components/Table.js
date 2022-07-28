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
import { DataGrid } from '@mui/x-data-grid';

function Table(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(useParams().keyspaceName);
    const [table, setTable] = useState(useParams().tableName);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);
	const [inputRow, setInputRow] = useState([]);

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

	function addRow(keyspace, table, inputRow) {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/addRow'
		const cols = columns.map((column => column.substring(0, column.indexOf('(')-1)));
		console.log(inputRow);
		axios.put(query, {cols: cols, row: [inputRow.toString()]}).then(
			(result) => {
			console.log('success');
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			console.log('fail');
			}
		)

		const query1 = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/rows'
		axios.get(query1)
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
	}
	
    console.log("hi");
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
		
		rows.forEach(row => {
			const temp = {};
            for (let i = 0; i < columns.length; i++) {
                temp[columns[i]] = row[i];
			}
			rowsFormatted.push(temp);
		});
        
		console.log(colsFormatted);
		console.log(rowsFormatted);

		var x = columns.length, str = '';
		while (x > 0) {
  		str = str + '<input type="text" name="list[]" id="list' + x + '">';
  			x = x - 1;
		}
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
				
				<form>
					<input type="text" id="list"></input>
					<Button variant="contained" onClick={() => {
						setInputRow(['4', '\'Hyderabad\'', '984', '\'ram\'', '50000']);
						{addRow(keyspace, table, inputRow)}
					}}>add
					</Button>
					<button type="submit">Add</button>
				</form>
			</div>
			// <div style={{ height: 400, width: '100%' }}>
      		// 	<DataGrid
			// 		getRowId={(row) => row[0]}
        	// 		rows={rowsFormatted}
        	// 		columns={colsFormatted}
        	// 		pageSize={5}
        	// 		rowsPerPageOptions={[5]}
      		// 	/>
    		// </div>
			
		);
	}
}


export default Table;