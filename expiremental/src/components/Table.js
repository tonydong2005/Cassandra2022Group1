import React, { Component, useState, useEffect } from 'react';
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
    Container,
    Typography,
    Avatar,
    Button,
    TablePagination,
    TableFooter
 }from '@mui/material';
import { blue , green} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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


function Tablez() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    //const [keyspace, setKeyspace] = useState(props.keyspace);
    const [list, setList] = useState([]);


    useEffect(() => {
        const query = 'http://localhost:8080/api/keyspaces/' + 'testkeyspace' /*put keyspace variable here instead*/+ '/tables'
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

    let TABLES = [];
    for (let i = 0; i < list.length; i++) {
        TABLES[i] = {
            name: list[i],
            size: "Table Size: " + Math.floor(Math.random()*100) + " MB",
            numCols: "Number of Columns: "+Math.floor(Math.random() * 10),
            numRows: "Number of Rows: "+Math.floor(Math.random() * 10),
            maxPartitionSize: "Maximum Partition Size: " + Math.floor(Math.random()) * 100 + " MB",

        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const listFormatted = [];
        return (
            <Container maxWidth='lg'>
                <Typography sx={{ fontSize: 22, mt: '18px', mb: '10px' }}>
                    Keyspace Name (put variable here instead)
            </Typography>
                    <TableContainer component={Paper}
                        sx={{
                            borderRadius: 5,
                            margin: '10px 10px',
                            maxWidth: 950
                        }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[900],
                                        color: 'white'
                                    }}
                                    align="left" >Table Name</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[900],
                                        color: 'white'
                                    }}
                                align="left" >Table Size Info</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[900],
                                        color: 'white'
                                    }}
                                    align="left" >Columns and Rows Info</TableCell>
                                
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[900],
                                        color: 'white'
                                    }}
                                    align="left" >View/Edit Table</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {TABLES.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.name}
                            //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="left">
                                    <Typography sx={{color: blue[600], fontWeight: 800}}> {row.name}</Typography>
                                </TableCell>
                                <TableCell align="left">
                                        <Typography>{row.size}</Typography>
                                        <Typography> {row.maxPartitionSize}</Typography>
                                </TableCell>
                                <TableCell align="left">
                                        <Typography> {row.numCols}</Typography>
                                        <Typography>  {row.numRows}</Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Button variant="contained">View</Button>
                                    <Button variant="contained">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
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

export default Tablez;