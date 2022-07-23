import React from 'react';
import { connect } from 'react-redux';
import Keyspace from './Keyspace';
import { Link } from 'react-router-dom';
import { getTables } from '../actions/tables';

const KeyspaceList = (props) => (
    
    <div>
        Keyspace List:

        <ul>
            {console.log(props)}
            
            {props.keyspaces.keyspaces.map(keyspace => {
                return (
                    <li key={keyspace.keyspaceName}>
                        <Keyspace {...keyspace} />
                    </li>
                );
            })}
        </ul>

    </div>
);

const mapStateToProps = (state) => {
    return {
        keyspaces: state
    };
}

export default connect(mapStateToProps)(KeyspaceList);
