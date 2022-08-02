import { React, Component, useState, useEffect, setState } from 'react';
import axios from 'axios';
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
	TableFooter
} from '@mui/material';
import { blue, green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import DescTable from './ViewTable';
import { ViewAgenda } from '@mui/icons-material';

//import { AgGridReact } from 'ag-grid-react';

const theme = createTheme();
theme.typography.table = {
	fontFamily: [
		'Open Sans',
		'sans-serif'
	].join(','),
	fontSize: '1.2rem',
	'@media (min-width:600px)': {
		fontSize: '1.5rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '2.4rem',
	}
};

function TableList(props) {
	const navigate=useNavigate();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(props.keyspace);
	const [myTable, setMytable]= useState(props.myTable);
	const [list, setList] = useState([]);
	const [columnDefs] = useState([{field:'tables'}])

	// const handleClick = (index) => {
	// 	// console.log("TableList handleClick - keyspace " + props.keyspace)		
	// 	// console.log("TableList handleClick - props.table " + props.myTable)		
	// 	console.log("TableList.handleClick " + keyspace  + "/" + myTable)		
	// 	console.log("TableList.handleClick.props " + props.keyspace  + "/" + props.myTable)		

	// 	// console.log("handleClick--table+" + table)
	// 	const tableN = index;		
	// 	// console.log("handleClick--table N Variable " + tableN)		
	// 	// setMytable(index)
	// 	// console.log("handleClick--keyspace:+ " + keyspace)		
	// };
	const viewButtonClick = (tableName) => {
		//DescTable.keyspace= "keyspace";
		console.log("TableList.ViewButtonClick " + props.keyspace +"/" + props.tableName)
		// console.log("TableList.ViewButtonClick " + props.keyspace +"/" + props.tableName)
		// console.log("rowname "+tableName)
		// setState({keyspaces: props.keyspace, table: tableName})
		DescTable(props)
		// props.row.name; 
		//<DescTable keyspace={keyspace} />
		// navigate("/viewTable"); 

	}


	useEffect(() => {
		// console.log("useEffect in TableList: " + keyspace )
		console.log("TableList.UseEffect " + keyspace  + "/" + myTable)		
		console.log("TableList.useEffect.props " + props.keyspace  + "/" + props.myTable)		

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
		// setMytable(props);
	}, [])

	let TABLES = [];
	for (let i = 0; i < list.length; i++) {
		TABLES[i] = {
			name: list[i],
			size: "Table Size: " + Math.floor(Math.random() * 100) + " MB",
			numCols: "Number of Columns: " + Math.floor(Math.random() * 10),
			numRows: "Number of Rows: " + Math.floor(Math.random() * 10),
			maxPartitionSize: "Maximum Partition Size: " + Math.floor(Math.random()) * 100 + " MB",

		}
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {
		const listFormatted = [];
		list.forEach((tables, index) => listFormatted.push({tables})); // for the Ag grid <li key={index}>{tableName}</li>
		/*return (
			<div id="myGrid" className="ag-theme-alpine" style={{height: 400, width: 600}}>
				<AgGridReact
				rowData={listFormatted}
				columnDefs={columnDefs}>

				</AgGridReact>
			</div>
			<ul>{listFormatted}</ul>
		);*/
		return (
			<Container maxWidth='lg'>
				<TableContainer component={Paper}
					sx={{
						borderRadius: 5,
						margin: '10px 10px',
						maxWidth: '950px'
					}} >
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
				                        fontSize: '15px'
									}}
									align="left" >Table Name</TableCell>
								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
										fontSize: '15px'
									}}
									align="left" >Table Size Info</TableCell>
								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
										fontSize: '15px'
									}}
									align="left" >Columns and Rows Info</TableCell>

								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
										fontSize: '15px'
									}}
									align="left" >View Table</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{TABLES.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
								<TableRow
									key={row.name}
								//sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="left">
										<Typography sx={{ color: blue[600], fontWeight: 800, fontSize: '15px'}}> {row.name}</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography sx = {{fontSize: '15px'}}>{row.size }</Typography>
										<Typography sx = {{fontSize: '15px'}}>{row.maxPartitionSize}</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography sx = {{fontSize: '15px'}}> {row.numCols}</Typography>
										<Typography sx = {{fontSize: '15px'}}>  {row.numRows}</Typography>
									</TableCell>
									<TableCell align="center">
										<Stack spacing={1}>
											{/* <Button onClick= {() => navigate(/"viewTable")} variant="contained">View</Button> */}

											 <Button onClick={() => {
												// viewButtonClick(row.name);
												navigate("/viewTable", {state: {keyspace: keyspace, table: row.name}}); 
												
												}
												}variant="contained"> View </Button> 
										

										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TablePagination sx = {{ width: '170%'}}
								rowsPerPageOptions={[5, 10, 15]}
								component="div"
								count={TABLES.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</TableFooter>
					</Table>
				</TableContainer>
			</Container>
		);
	  }
	}


export default TableList;