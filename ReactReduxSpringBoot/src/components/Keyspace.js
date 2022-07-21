import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTables } from '../actions/tables';

const Keyspace = ({ keyspaceName, dispatch }) => (
    <div>
        <Link to={`/keyspaces/${keyspaceName}/tables`} onClick={() => {
            dispatch(getTables({ keyspaceName }));
        }}>
            <h4>{keyspaceName}</h4>
        </Link>
    </div>
);

export default connect()(Keyspace);