import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRows } from '../actions/rows';
import { getColumns } from '../actions/columns';

const Table = ({ tableName, keyspaceName, rows, dispatch }) => (
    <div>
        <Link to={`/keyspaces/${keyspaceName}/tables/${tableName}`} onClick={() => {
            dispatch(getRows({ keyspaceName, tableName, rows}));
            dispatch(getColumns({ keyspaceName, tableName }));
        }}>
            <h4>{tableName}</h4>
        </Link>
    </div>
);

export default connect()(Table);