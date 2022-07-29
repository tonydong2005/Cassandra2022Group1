import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, id, city, phone) {
  return {name, id, city, phone };
}

const rows = [
  createData('Sophia', 1, 'Sugar Land', 8328867189 ),
  createData('Tina', 2, 'Sugar Land', 2222222222),
  createData('Olivia', 3, 'Houston', 3333333333),
  createData('Sabrina', 4, 'Houston', 4444444444),
];

function table() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right" >ID</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default table;