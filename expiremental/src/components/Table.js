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
import AddRow from './AddRow';
import { Button } from '@mui/material';

function Table(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(useParams().keyspaceName);
    const [table, setTable] = useState(useParams().tableName);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);
	const [inputRow, setInputRow] = useState(['2', '\'Vikas\'', '12', '\'Dallas\'', '12']);

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
	useEffect(() => {
		const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/addRow'
		const cols = columns.map((column => column.substring(0, column.indexOf('(')-1)));
		console.log(cols);
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
	}, [columns, inputRow]
	);
	const useRowAdder = () => 
	{
		const list = rows.map(item => item);
		setInputRow(['2', '\'Vikas\'', '12', '\'Dallas\'', '12']);
		list.push(inputRow);
		setRows(list);
	}
    console.log(keyspace + table);
    console.log(rows);
    console.log(columns);

	if (error) {
		return <div>Error: {error.message}</div>;
	  } else if (!isLoaded) {
		return <div>Loading...</div>;
	  } else {
		const colsFormatted = [];
        columns.forEach((column, index) => colsFormatted.push(<TableCell key={index}>{column}</TableCell>))
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
			[<div id="myGrid" className="ag-theme-alpine" style={{height: 400, width: 600}}>
				<AgGridReact
				rowData={rowsFormatted}
				columnDefs={colsFormatted}>

				</AgGridReact>
			</div>,
            <TableContainer key='0' component={Paper}>
      <Bruhmoment sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {colsFormatted}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((element, index) =><TableCell align="center">{element}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Bruhmoment>
    </TableContainer>, <Button variant='contained' onClick={useRowAdder}>Add Row</Button>,<Button variant="contained" onClick={() => {
					{navigate(`/`, { replace: true })}
				}}>bacc
				
			</Button>	]
				
			
		);
	}
}


export default Table;