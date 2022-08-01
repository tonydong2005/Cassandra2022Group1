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
import { ConstructionOutlined } from '@mui/icons-material';

function Table(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(useParams().keyspaceName);
    const [table, setTable] = useState(useParams().tableName);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);
	const [inputRow, setInputRow] = useState([]);
	const [update, setUpdate] = useState(false);
	const [formValues, setFormValues] = useState([]);

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
		axios.put(query, {cols: cols, row: inputRow}).then(
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

	function deleteRow(keyspace, table, inputRow) {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/deleteRow'
		const cols = columns.map((column => column.substring(0, column.indexOf('(')-1)));

		columns.map((column, index) => {
			if (column.includes('int')) {}
			else if (column.includes('text')) {
				inputRow[index] = '\'' + inputRow[index] + '\'';
			}
		})

		console.log(inputRow);
		axios.put(query, {cols: cols, row: inputRow}).then(
			(result) => {
				console.log('delete success');
				delay(1000);
				getRows();
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			console.log('delete fail');
			}
		)
		columns.map((column, index) => {
			if (column.includes('text')) {
				inputRow[index] = inputRow[index].substring(1, inputRow[index].length - 1);
			}
		})
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const list = formValues;
		
		list[name] = value;
		console.log(list);
		setFormValues(list);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
		columns.map((column, index) => {
			if (column.includes('int')) {}
			else if (column.includes('text')) {
				formValues[index] = '\'' + formValues[index] + '\'';
			}
		})
		addRow(keyspace, table, formValues);
		setFormValues([]);
	};
	
    console.log("hi");
    console.log(keyspace + table);
    console.log(rows);
    console.log(columns);

	class BtnCellRenderer extends Component {
		constructor(props) {
		  super(props);
		  this.btnClickedHandler = this.btnClickedHandler.bind(this);
		}
		btnClickedHandler() {
		 this.props.clicked(this.props.value);
		}
		render() {
		  return (
			<button onClick={this.btnClickedHandler}>Delete</button>
		  )
		}
	  }

	if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {
		const colsFormatted = [];
		const rowsFormatted = [];
        columns.forEach((column, index) => colsFormatted.push({field: column, sortable: true}));
		colsFormatted.push({
			field: 'buttons',
			cellRenderer: BtnCellRenderer,
			cellRendererParams: {
				clicked: function(field) {
					deleteRow(keyspace, table, field);
					console.log(field);
				},
			},
		});
		rows.forEach(row => {
			const temp = {};
            for (let i = 0; i < columns.length; i++) {
                temp[columns[i]] = row[i];
			}
			temp["buttons"] = row;
			rowsFormatted.push(temp);
		});
        
		console.log(colsFormatted);
		console.log(rowsFormatted);

		return (
			<div id="myGrid" className="ag-theme-alpine" style={{height: 400, width: 1200}}>
				<AgGridReact
				rowData={rowsFormatted}
				columnDefs={colsFormatted}
				animateRows={true}>
				</AgGridReact>

           		<Button variant="contained" onClick={() => {
					{navigate(`/`, { replace: true })}
				}}>bacc
				</Button>

				<form onSubmit={handleSubmit}>
      				<Grid container alignItems="center" justify="center" direction="column">
        				{
							<ul>
								{columns.map((column, index) => {
                					if (column.includes('int'))
									return (
                    					<li key={column}>
                        					
											<Grid item>
          										<TextField
            										id="field1-input"
            										name={index}
            										label={column}
            										type="number"
            										value={formValues[index]}
            										onChange={handleInputChange}
          										/>
        									</Grid>
                    					</li>
                					);
									else if (column.includes('text'))
									return (
										<li key={column}>
                        					
											<Grid item>
          										<TextField
            										id="field1-input"
            										name={index}
            										label={column}
            										type="text"
            										value={formValues[index]}
            										onChange={handleInputChange}
          										/>
        									</Grid>
                    					</li>
									);
									else if (column.includes('uuid'))
									return (
										<li key={column}>
                        					
											<Grid item>
          										<TextField
            										id="field1-input"
            										name={index}
            										label={column}
            										type="text"
            										value={formValues[index]}
            										onChange={handleInputChange}
          										/>
        									</Grid>
                    					</li>
									);
            					})}
							</ul>	
						}
						<Button variant="contained" color="primary" type="submit">
          					Submit
        				</Button>
      				</Grid>
   				 </form>
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