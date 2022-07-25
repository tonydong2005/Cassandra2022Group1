import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTables } from '../actions/tables';
import { Button } from '@material-ui/core';

const Keyspace = ({ keyspaceName, dispatch }) => (
    <div>
        <Button component={Link} to={`/keyspaces/${keyspaceName}/tables`} variant="contained" color="primary" onClick={() => {
            dispatch(getTables({ keyspaceName }));
        }}>
            {keyspaceName}
        </Button>
    </div>
);

export default connect()(Keyspace);