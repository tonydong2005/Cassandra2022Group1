import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
//import { AgGridReact } from 'ag-grid-react';

function TableList(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [keyspace, setKeyspace] = useState(props.keyspace);
	const [list, setList] = useState([]);
	const [columnDefs] = useState([{field:'tables'}])


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
	  }
	}


export default TableList;