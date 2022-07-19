import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTables } from '../actions/tables';

const Keyspace = ({ keyspaceName, tables, dispatch }) => (
    <div>
        <Link to={`/keyspaces/${keyspaceName}`} onClick={() => {
            dispatch(getTables({ keyspaceName, tables }));
        }}>
            <h4>{keyspaceName}</h4>
        </Link>
    </div>
);

export default connect()(Keyspace);