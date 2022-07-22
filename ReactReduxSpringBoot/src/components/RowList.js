import React from 'react';
import { connect } from 'react-redux';
import Table from './Table';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component


const RowList = (props) => (
    
    <div>
        Row List:
        <ul>
            {console.log(props)}
        </ul>
        <div className="ag-theme-blue" style={{width: 800, height: 500}}>

        

       <AgGridReact

           rowData={props.rows.rows} // Row Data for Rows

           columnDefs={props.rows.columns} // Column Defs for Columns

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           />
     </div>
    </div>


    
);

const mapStateToProps = (state) => {
    
    

    return {
        
        rows: state

    };
}

export default connect(mapStateToProps)(RowList);