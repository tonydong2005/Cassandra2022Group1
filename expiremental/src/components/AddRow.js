import axios from 'axios';
import React, { Component, useState, useEffect, useRef } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function AddRow(props) {
	const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [success, setSuccess] = useState(false);
	const [keyspace, setKeyspace] = useState(props.keyspace);
    const [table, setTable] = useState(props.table);
	const [columns, setCols] = useState(props.columns);
    const [inputRow, setInputRow] = useState([]);
    const inputRef = useRef(null);
    const [currentValue, setValue] = useState('');
    const [values, setValues] = useState(Array(columns.length).fill('',0,columns.length));

    var counter = 0;
    const HandleChange = () => {
        const list = values.map(item => item);
        list[counter] = currentValue;
        setValues(list);
        console.log(list);
    }


    function HandleSubmit() {
        useEffect(() => {
            const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/addRow'
            axios.put(query, {colLabels: columns.map((column => column.substring(0, column.indexOf('(')))), row: inputRow})
            .then(
                (result) => {
                setIsLoaded(true);
                setSuccess(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                setIsLoaded(true);
                setError(error);
                }
            )
        }, []);
        console.log(success);
    }

    const columnFormat = columns.map((column, index) => 
        <label key={index}>
          {column}: 
          <input type="text" value={currentValue} onChange={HandleChange}/>
          {counter++}
        </label>);
    
    return (
        <form>
                {columnFormat}
            <input type="submit" value="Submit" onClick={HandleSubmit} />
            </form>
    );

}


export default AddRow;