import { React, Component, useState, useEffect } from 'react';
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
	const navigate = useNavigate();

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
	const [tables, setTables] = useState([]);
	const [columnDefs] = useState([{ field: 'tables' }])


	useEffect(() => {
		const query = 'http://localhost:8080/api/keyspaces/' + keyspace + '/tables'
		axios.get(query)
			.then(
				(result) => {
					setTables(result.data);
					setIsLoaded(true);
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

	// for (let i = 0; i < tables.length; i++) {
	// 	tablesFormatted[i] = {
	// 		name: tables[i],
	// 		size: "Table Size: " + Math.floor(Math.random() * 100) + " MB",
	// 		numCols: "Number of Columns: " + Math.floor(Math.random() * 10),
	// 		numRows: "Number of Rows: " + Math.floor(Math.random() * 10),
	// 		maxPartitionSize: "Maximum Partition Size: " + Math.floor(Math.random()) * 100 + " MB",

	// 	}
	// }

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {


		const tablesFormatted = tables.map((table, index) => (

			<TableRow key={index}>
				<TableCell component="th" scope="row" align="left">
					<Typography sx={{
						color: blue[600], fontWeight: 800, fontFamily: [
							'Open Sans',
							'sans-serif'
						].join(','),fontSize: '15px' }}> {table.table}</Typography>
				</TableCell>
				<TableCell align="left">
					<Typography sx={{
						fontFamily: [
							'Open Sans',
							'sans-serif'
						].join(','),fontSize: '15px' }}>Table Size: {table.metrics[0]}</Typography>
					<Typography sx={{
						fontFamily: [
							'Open Sans',
							'sans-serif'
						].join(','),fontSize: '15px' }}>Number of Columns: {table.metrics[1]}</Typography>
				</TableCell>
				<TableCell align="left">
					<Typography sx={{
						fontFamily: [
							'Open Sans',
							'sans-serif'
						].join(','),fontSize: '15px' }}>Number of Rows: {table.metrics[2]}</Typography>
					<Typography sx={{
						fontFamily: [
							'Open Sans',
							'sans-serif'
						].join(','),fontSize: '15px' }}>{table.metrics[3]}</Typography>
				</TableCell>
				<TableCell align="center">
					<Stack spacing={1}>

						<Button sx={{
							fontFamily: [
								'Open Sans',
								'sans-serif'
							].join(','), fontSize: '15px'
						}} onClick={() => navigate(`/${keyspace}/${table.table}`)} variant="contained"> View </Button>

					</Stack>
				</TableCell>
			</TableRow>

		));

		// const listFormatted = [];
		// list.forEach((tables, index) => listFormatted.push({tables})); // for the Ag grid <li key={index}>{tableName}</li>
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
			<Container maxWidth='lg' >
				<TableContainer component={Paper}
					sx={{
						borderRadius: 5,
						margin: '10px 10px',
						maxWidth: '950px',
					}} >
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
										fontFamily: [
											'Open Sans',
											'sans-serif'
										].join(','),
				                        fontSize: '15px'
									}}
									align="left" >Table Name</TableCell>
								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
										fontFamily: [
											'Open Sans',
											'sans-serif'
										].join(','),
										fontSize: '15px'
									}}
									align="left" >Table Size Info</TableCell>
								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
										fontFamily: [
											'Open Sans',
											'sans-serif'
										].join(','),
										fontSize: '15px'
									}}
									align="left" >Columns and Rows Info</TableCell>

								<TableCell
									sx={{
										fontWeight: 'bold',
										backgroundColor: blue[700],
										color: 'white',
										fontFamily: [
											'Open Sans',
											'sans-serif'
										].join(','),
										fontSize: '15px'
									}}
									align="left" >View Table</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tablesFormatted}
						</TableBody>
						<TableFooter>
							<TablePagination sx = {{ width: '170%'}}
								rowsPerPageOptions={[5, 10, 15]}
								component="div"
								count={tablesFormatted.length}
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