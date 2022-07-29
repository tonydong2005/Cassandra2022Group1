import React from 'react';
import BookList from './BookList';
import KeyspaceList from './KeyspaceList';

const DashBoard = () => (
    <div className='container__list'>
        <BookList />
        <KeyspaceList />
    </div>
);

export default DashBoard;