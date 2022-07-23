import React from 'react';
import { connect } from 'react-redux';
import Table from './Table';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component


const RowList = (props) => (
    <div>
        Row List:
        <ul>
            {console.log(props)}
            {props.rows.rows.map(row => {
                let str = "";
                for (let i = 0; i < row.length; i++) {
                    str += row[i] + ', ';
                }
                str = str.substring(0, str.length - 2);
                return (
                    <li>
                        {str}
                    </li>
                );
            })}
        </ul>
        <div className="ag-theme-dark" style={{width: 800, height: 500}}>

       <AgGridReact

           rowData={props.rows.rows} // Row Data for Rows

           columnDefs={props.columnDefs} // Column Defs for Columns

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           />
     </div>
    </div>
    
);

const mapStateToProps = (state) => {
    return {
        
        rows: state,
        columnDefs: [
            {field: '0', filter: true},
            {field: '1', filter: true},
            {field: '2', filter: true},
            {field: '3', filter: true},
            {field: '4', filter: true}
        ]
    };
}

export default connect(mapStateToProps)(RowList);