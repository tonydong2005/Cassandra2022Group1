import React from 'react';
import { connect } from 'react-redux';

const KeyspaceList = (props) => (
    <div>
        Keyspace List:

        <ul>
            {console.log(props.keyspaces.keyspaces)}
            {props.keyspaces.keyspaces.map(keyspace => {
                return (
                    <li>
                       {keyspace}
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