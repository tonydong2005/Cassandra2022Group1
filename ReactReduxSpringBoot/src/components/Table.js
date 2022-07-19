import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Table = ({ tableName, dispatch }) => (
    <div>
        <h4>{tableName}</h4>
    </div>
);

export default connect()(Table);