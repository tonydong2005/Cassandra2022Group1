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

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Table(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(useParams().keyspaceName);
    const [table, setTable] = useState(useParams().tableName);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);
	const [inputRow, setInputRow] = useState([]);
	const [update, setUpdate] = useState(false);
	const [formValues, setFormValues] = useState({field1: 0, field2: "", field3: 0, field4: "", field5: 0});

	let navigate = useNavigate();

	function delay(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}

	useEffect(() => {
		getRows();
		setUpdate(false);
	}, [update])

	function getRows() {
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
	}

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
				delay(1000);
				getRows();
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			console.log('fail');
			}
		)
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
		  ...formValues,
		  [name]: value,
		});
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
		setInputRow([formValues.field1, "\'" + formValues.field2 + "\'", formValues.field3, "\'" + formValues.field4 +"\'", formValues.field5]);
		console.log(inputRow);
		addRow(keyspace, table, inputRow);
	};
	
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
				<form onSubmit={handleSubmit}>
      				<Grid container alignItems="center" justify="center" direction="column">
        				<Grid item>
          					<TextField
            					id="field1-input"
            					name="field1"
            					label="Field1"
            					type="number"
            					value={formValues.field1}
            					onChange={handleInputChange}
          					/>
        				</Grid>
        				<Grid item>
          					<TextField
            					id="field2-input"
            					name="field2"
            					label="Field2"
            					type="text"
            					value={formValues.field2}
            					onChange={handleInputChange}
          					/>
        				</Grid>
						<Grid item>
          					<TextField
            					id="field3-input"
            					name="field3"
            					label="Field3"
            					type="number"
            					value={formValues.field3}
            					onChange={handleInputChange}
          					/>
        				</Grid>
						<Grid item>
          					<TextField
            					id="field4-input"
            					name="field4"
            					label="Field4"
            					type="text"
            					value={formValues.field4}
            					onChange={handleInputChange}
          					/>
        				</Grid>
						<Grid item>
          					<TextField
            					id="field5-input"
            					name="field5"
            					label="Field5"
            					type="number"
            					value={formValues.field5}
            					onChange={handleInputChange}
          					/>
        				</Grid>
						<Button variant="contained" color="primary" type="submit">
          					Submit
        				</Button>
      				</Grid>
   				 </form>
				<form id="addForm">
					<h1>Sign Up</h1>
					<div>
						<label>Enter first field: </label>
						<input type="text" id="field1" name="name" placeholder="Enter first field" />
						<small></small>
					</div>
					<div>
						<label>Enter second field: </label>
						<input type="text" id="field2" name="name" placeholder="Enter second field" />
						<small></small>
					</div>
					<div>
						<label>Enter third field: </label>
						<input type="text" id="field3" name="name" placeholder="Enter third field" />
						<small></small>
					</div>
					<div>
						<label>Enter fourth field: </label>
						<input type="text" id="field4" name="name" placeholder="Enter fourth field" />
						<small></small>
					</div>
					<div>
						<label>Enter fifth field: </label>
						<input type="text" id="field5" name="name" placeholder="Enter fifth field" />
						<small></small>
					</div>
					
					<button type="submit">Confirm</button>
				</form>
				
				<Button variant="contained" onClick={() => {
					document.forms["addForm"].submit();
					const form = document.getElementById('addForm').elements;
						setInputRow([form[0], form[1], form[2], form[3], form[4]]);
						console.log(inputRow);
						//{addRow(keyspace, table, inputRow)};

					}}>add
					</Button>
					<Button variant="contained" onClick={() => {
						{setUpdate(true)};
					}}>update
					</Button>
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