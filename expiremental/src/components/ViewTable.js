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
    TableFooter,
    Toolbar
} from '@mui/material';
import { blue, green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';


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

function DescTable(props) {
    const navigate = useNavigate();
    const { state } = useLocation();

    console.log("keyspace: ", state.keyspace)
    console.log("table1: ", state.table)

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
    const [keyspace, setKeyspace] = useState()
    const [myTable, setMytable] = useState();

    const [list, setList] = useState([]);
    const [columnDefs] = useState([{ field: 'tables' }])

    useEffect(() => {

        const query = 'http://localhost:8080/api/keyspaces/' + state.keyspace + '/tables/' + state.table
        console.log(query)
        axios.get(query)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setList(result.data);
                    // console.log("full list " + list);
                    // console.log("type " + typeof list)
                    // console.log(list.length)
                    // console.log(list.length)

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

    // const arrLength = list.length;
    // const arrSize = 5;
    // let TABLES = [[], []];

    // console.log("list console : " + list);
    
    // // console.log(list[0]);
    // // console.log("dyn " + list[0][0]);

    // for (let i = 0; i < list.length; i++) {
    //     for (let j = 0; j < list[i].length; j++) {
    //         console.log("listij "+ list[i][j])
    //         TABLES[i][j] = {
    //             name: list[i][0],
    //             author: list[i][1],
    //             description: list[i][2],
    //             published: list[i][3],
    //             title: list[i][4],                
    //             // size: "Table Size: " + Math.floor(Math.random() * 100) + " MB",
    //             // numCols: "Number of Columns: " + Math.floor(Math.random() * 10),
    //             // numRows: "Number of Rows: " + Math.floor(Math.random() * 10),
    //             // maxPartitionSize: "Maximum Partition Size: " + Math.floor(Math.random()) * 100 + " MB",
    //         }
    //         console.log(TABLES[i][j])
    //     }
    // }


    let tableInfo = [];
    console.log("list console : " + list);
    
	for (let i = 0; i < list.length; i++) {
        for(let j=0; j<list[i].length; j++){
		tableInfo[i] = {
			name: list[i][j],
            author: list[i][++j],
			description: list[i][++j],
            published: list[i][++j],
            title: list[i][++j]

        }

		}
        console.log("table info j: "+ tableInfo)
	}

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const listFormatted = [];
        list.forEach((tables, index) => listFormatted.push({ tables }));

        return (
            
            <Container maxWidth='lg'>
                <Toolbar align = 'center'>
                  <Typography align = 'center' sx = {{mt: '30px', mb: '15px', fontSize: '20px'}}> Table Name: {state.table} </Typography>
                  <Button variant = 'contained' sx = {{mt: '30px', mb: '15px', ml: 'auto', fontSize: '16px'}} >
                    Add Row
                  </Button>
                  <Button variant = 'contained' href="/keyspaces" sx = {{mt: '30px', mb: '15px', ml: '10px', fontSize: '16px'}}>
                    Back
                  </Button>
                </Toolbar>
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
                                    align="left" >title</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[700],
                                        color: 'white',
                                        fontSize: '15px'
                                    }}
                                    align="left" >author</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[700],
                                        color: 'white',
                                        fontSize: '15px'
                                    }}
                                    align="left" >description</TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[700],
                                        color: 'white',
                                        fontSize: '15px'
                                    }}
                                    align="left" >published</TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: blue[700],
                                        color: 'white',
                                        fontSize: '15px'
                                    }}
                                    align="left" >id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
							{tableInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
								<TableRow
									key={row.name}
								//sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="left">
										<Typography sx={{ color: blue[600], fontWeight: 800, fontSize: '15px'}}> {row.name}</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography sx = {{fontSize: '15px'}}>{row.author }</Typography>
                                    </TableCell>
                                    <TableCell>
										<Typography sx = {{fontSize: '15px'}}>{row.description}</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography sx = {{fontSize: '15px'}}> {row.published}</Typography>
                                    </TableCell>
                                    <TableCell>
										<Typography sx = {{fontSize: '15px'}}>  {row.title}</Typography>
									</TableCell>
									
								</TableRow>
							))}
						</TableBody>
                        <TableFooter>
                            <TablePagination sx={{ width: '170%' }}
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={tableInfo.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        )

    }
}


export default DescTable;