import React from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import queryString from 'querystring';
import { useParams } from 'react-router-dom';
import { userId } from '../routers/AppRouter';
import Child  from '../routers/AppRouter';
import { getTables } from '../actions/tables';

const TableList = (props) => (
    <div>
        Table List:
        <ul>
            {console.log(props)}
            {props.tables.tables.map(table => {
                return (
                    <li key={table.tableName}>
                        <Table {...table} />
                    </li>
                );
            })}
        </ul>

    </div>
);

const mapStateToProps = (state) => {
    return {
        tables: state
    };
}

export default connect(mapStateToProps)(TableList);