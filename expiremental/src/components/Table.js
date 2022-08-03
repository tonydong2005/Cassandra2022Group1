import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { blue, grey } from '@mui/material/colors';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import '../ag-theme-custom.css';

import { useParams } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { default as Bruhmoment } from '@mui/material/Table';
import { DataGrid } from '@mui/x-data-grid';

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ConstructionOutlined, Delete} from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Stack,
    Container,
    Typography,
    Avatar,
    Button,
    TablePagination,
    TableFooter,
	Select,
	MenuItem,

} from '@mui/material';

function ViewTable(props) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(useParams().keyspaceName);
    const [table, setTable] = useState(useParams().tableName);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);
	const [inputRow, setInputRow] = useState([]);
	const [formValues, setFormValues] = useState([]);
	const [success, setSuccess] = useState(false);
	const [sortBy, setSortBy] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);

	const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
				console.log(result.data);
				setSuccess(result.data);
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

	function onPageSizeChanged() {
		var select = document.getElementById('page-size');
		var value = select.options[select.selectedIndex].value;
		console.log(value);
	}
	


	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		const colsFormatted = [];
		const rowsFormatted = [];
		// const colsFormatted = columns.map((column, index) =>
		// 	<TableCell
		// 	sx={{
		// 		fontWeight: 'bold',
		// 		backgroundColor: blue[700],
		// 		color: 'white',
		// 		fontSize: '15px'
		// 	}}
		// 	align="left">
		// 	{column}
		// 	</TableCell>
		// )
		// colsFormatted.push(
		// 	<TableCell
		// 	sx={{
		// 		fontWeight: 'bold',
		// 		backgroundColor: blue[700],
		// 		color: 'white',
		// 		fontSize: '15px'
		// 	}}
		// 	align="left">
		// 	buttons
		// 	</TableCell>)
		// const rowsFormatted = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>
		// 	<TableRow
		// 	key={index}>
		// 	{row.map((data, index) => 
		// 		<TableCell align="left">
		// 			<Typography sx = {{fontSize: '15px'}}>{data}</Typography>
		// 		</TableCell>
		// 	)}
		// 	<TableCell align="left">
		// 			<Typography sx = {{fontSize: '15px'}}>
		// 				<Button variant="contained" color="primary" onClick={() => deleteRow(keyspace, table, row)}>
		//   					delete
		// 				</Button>
		// 			</Typography>
		// 	</TableCell>
		// 	</TableRow>


		// );

		columns.forEach((column, index) => colsFormatted.push({ field: column, sortable: true, resizable: true, filter: true }));
		colsFormatted.push({
			field: 'delete row',
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
			rowsFormatted.push(temp);
		});


		console.log(colsFormatted);
		console.log(rowsFormatted);


		return (
			<Box sx={{
				mt: '5px'
			}}>
				<div id="myGrid" className="ag-theme-material ag-theme-custom" style={{
					height: 700, width: '100%', fontFamily: [
						'Open Sans',
						'sans-serif'
					].join(','), fontWeight: 'bold',fontSize: 13}}>
				
				{/* <Container maxWidth='lg'>
                <Typography sx = {{mt: '20px', fontSize: '20px'}}> Table Name: {table} </Typography>
                <TableContainer component={Paper}
                    sx={{
                        borderRadius: 5,
                        margin: '10px 10px',
                        maxWidth: '950px'
                    }} >
                    <Table
					sx={{ minWidth: 650 }}
					aria-label="simple table"
					requestSort={requestSort.bind(this)}
					sortOrder={sortOrder}
          			sortBy={sortBy}
					>
                        <TableHead>
                            <TableRow>
								{colsFormatted}
                            </TableRow>
                        </TableHead>
                        <TableBody>
							{rowsFormatted}
						</TableBody>
                        <TableFooter>
                            <TablePagination sx={{ width: '170%' }}
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container> */}
				
				<AgGridReact
					rowData={rowsFormatted}
					columnDefs={colsFormatted}
					animateRows={true}
					pagination={true}
					paginationPageSize={rowsPerPage}
					>
					
					</AgGridReact>	
					
					<Box sx={{
						mt: '-55px',  }}>
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
							width: '9%', mx: '5px', my: '9px', fontWeight: 'bold', fontFamily: ['Open Sans','sans-serif'].join(',') }} onClick= { handleClickOpen}>add
				</Button>
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle align='center' sx={{fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>Enter Data</DialogTitle>
							<DialogContent align='center'>
								<DialogContentText sx={{ my: 2, fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',')}}>
									To add data to this row, please enter data for each column and press submit.
          </DialogContentText>
								<form name='addForm' onSubmit={handleSubmit} fullWidth>
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
													else if (column.includes('uuid'))
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
								<Button onClick={handleSubmit}>
									Submit
        				</Button>
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