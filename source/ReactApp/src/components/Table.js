/************************************************************
 * Table.js codes for the formatting and the functionality
 * of the data display page of the website. Refer to any
 * additional comments for details about the code.
 * 
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 * 
 * Last updated: 8/3/2022
 ***********************************************************/

import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import '../ag-theme-custom.css';

import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Button, MenuItem } from '@mui/material';

function ViewTable(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(useParams().keyspaceName);
    const [table, setTable] = useState(useParams().tableName);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);
	const [formValues, setFormValues] = useState([]);
	const [success, setSuccess] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
	const [open, setOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleEditClickOpen = () => {
		setEditOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setFormValues(formValues.map(x => ''));
		var frm = document.getElementsByName('addForm')[0];
		frm.reset();
	};
	const handleEditClose = () => {
		setEditOpen(false);
		setFormValues(formValues.map(x => ''));
		var frm = document.getElementsByName('editForm')[0];
		frm.reset();
	};

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };

	let navigate = useNavigate();

	function getRows() {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/rows'
		axios.get(query)
		.then(
			(result) => {
				setIsLoaded(true);
				setRows(result.data);
			},
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
				console.log(result.data);
				setSuccess(result.data);
				getRows();
			},
			(error) => {
				console.log('fail');
			}
		)
	}

	function editRow(keyspace, table, inputRow) {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/editRow'
		const cols = columns.map((column => column.substring(0, column.indexOf('(')-1)));
		console.log(inputRow);
		axios.put(query, {cols: cols, row: inputRow}).then(
			(result) => {
				console.log('edit success');
				getRows();
			},
			(error) => {
				console.log('edit fail');
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
				getRows();
			},
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
		const list = formValues.map(x => x);
		
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
		setFormValues(formValues.map(x => ''));
		var frm = document.getElementsByName('addForm')[0];
		frm.reset();
	};
	const handleEditSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
		columns.map((column, index) => {
			if (column.includes('int')) {}
			else if (column.includes('text')) {
				formValues[index] = '\'' + formValues[index] + '\'';
			}
		})
		editRow(keyspace, table, formValues);
		columns.map((column, index) => {
			if (column.includes('int')) {}
			else if (column.includes('text')) {
				formValues[index] = formValues[index].substring(1, formValues[index].length - 1);
			}
		})
		setFormValues(formValues.map(x => ''));
		var frm = document.getElementsByName('editForm')[0];
		frm.reset();
	};

	class EditBtnCellRenderer extends Component {
		constructor(props) {
			super(props);
			this.btnClickedHandler = this.btnClickedHandler.bind(this);
		}
		btnClickedHandler() {
			this.props.clicked(this.props.value);
		}
		render() {
			return (
				<Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={this.btnClickedHandler} sx={{
				  fontWeight: 'bold',fontFamily: [
					  'Open Sans',
					  'sans-serif'
				  ].join(',')
				}}>
          			edit
        		</Button>
			)
		}
	}
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
				<Button variant="contained" color="primary" startIcon={<PlaylistRemoveIcon />} onClick={this.btnClickedHandler} sx={{
				  fontWeight: 'bold',fontFamily: [
					  'Open Sans',
					  'sans-serif'
				  ].join(',')
				}}>
          			delete
        		</Button>
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

		columns.forEach((column, index) => colsFormatted.push({ field: column, sortable: true, resizable: true, filter: true }));
		colsFormatted.push({
			field: 'edit row',
			width: 140,
			cellRenderer: EditBtnCellRenderer,
			cellRendererParams: {
				clicked: function (field) {
					setFormValues(field);
					handleEditClickOpen();
					console.log(field);
				},
			},
		});
		colsFormatted.push({
			field: 'delete row',
			width: 160,
			cellRenderer: BtnCellRenderer,
			cellRendererParams: {
				clicked: function (field) {
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
			temp["delete row"] = row;
			temp["edit row"] = row;
			rowsFormatted.push(temp);
		});

		return (
			<Box sx={{
				mt: '5px'
			}}>
				<div id="myGrid" className="ag-theme-material ag-theme-custom" style={{
					height: 700, width: '100%', fontFamily: [
						'Open Sans',
						'sans-serif'
					].join(','), fontWeight: 'bold',fontSize: 13}}>
				
					<AgGridReact
						rowData={rowsFormatted}
						columnDefs={colsFormatted}
						animateRows={true}
						pagination={true}
						paginationPageSize={rowsPerPage}
					>
					</AgGridReact>	
					
					<Box sx={{mt: '-55px',  }}>
						<TextField
							id="field1-input"
							name='Rows Per Page'
							label='Rows Per Page'
							type="number"
							value={rowsPerPage}
							onChange={handleChangeRowsPerPage}
							sx={{ width: '12%',  maxWidth: '110px', height: '50px'}}
						/>	
						<Button variant="contained" startIcon={<PlaylistAddIcon />} sx={{
							width: '9%', mx: '5px', my: '9px', fontWeight: 'bold', fontFamily: ['Open Sans','sans-serif'].join(',') }} onClick= {handleClickOpen}>add
						</Button>
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle align='center' sx={{fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>Enter Data</DialogTitle>
							<DialogContent align='center'>
								<DialogContentText sx={{ my: 2, fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',')}}>
									To add data to this row, please enter data for each column and press submit.
          						</DialogContentText>
								<form name='addForm' onSubmit={handleEditSubmit} fullWidth>
									<Grid container fullWidth alignItems="center" justify="center" direction="column">
										{
											<Stack direction='column' FullWidth>
												{columns.map((column, index) => {
													if (column.includes('int'))
														return (
															<MenuItem FullWidth>
																<Grid item fullWidth>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="number"
																		value={formValues[index]}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
													else if (column.includes('text'))
														return (
															<MenuItem>
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
															</MenuItem>
														);
													else
														return (
															<MenuItem>
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
															</MenuItem>
														);
												})}
											</Stack>
										}
									</Grid>
								</form>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Cancel</Button>
								<Button onClick={handleSubmit}>Submit</Button>
							</DialogActions>
						</Dialog>
						<Dialog open={editOpen} onClose={handleEditClose}>
							<DialogTitle align='center' sx={{fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>Edit Data</DialogTitle>
							<DialogContent align='center'>
								<DialogContentText sx={{ my: 2, fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',')}}>
									To edit data for this row, please change data and press submit.
          						</DialogContentText>
								<form name='editForm' onSubmit={handleSubmit} fullWidth>
									<Grid container fullWidth alignItems="center" justify="center" direction="column">
										{
											<Stack direction='column' FullWidth>
												{columns.map((column, index) => {
													if (column.includes('int'))
														return (
															<MenuItem FullWidth>

																<Grid item fullWidth>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="number"
																		value={formValues[index]}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
													else if (column.includes('text'))
														return (
															<MenuItem>

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
															</MenuItem>
														);
													else
														return (
															<MenuItem>

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
															</MenuItem>
														);
												})}
											</Stack>
										}
										
									</Grid>
								</form>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleEditClose}>Cancel</Button>
								<Button onClick={handleEditSubmit}>Submit</Button>
							</DialogActions>
						</Dialog>		
					</Box>
					<Button variant="contained" startIcon={<ArrowBackIcon />} sx={{ my: '10px', mx: '5px', fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',')  }} onClick={() => {
						{ navigate(`/keyspaces`, { replace: true }) }
					}}>
						Back
					</Button>
				</div>
			</Box>
		);
	}
}

export default ViewTable;