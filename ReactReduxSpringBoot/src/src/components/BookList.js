import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';

const BookList = (props) => (
    <div>
        Book List:

        <ul>
            {console.log(typeof props.books.books)}
            {props.books.books.map(book => {
                return (
                    <li key={book.id}>
                        <Book {...book} />
                    </li>
                );
            })}
        </ul>

    </div>
);

const mapStateToProps = (state) => {
    return {
        books: state
    };
}

export default connect(mapStateToProps)(BookList);