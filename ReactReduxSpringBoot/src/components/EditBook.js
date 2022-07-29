import React from 'react';
import BookForm from './BookForm';
import { connect } from 'react-redux';
import { editBook } from '../actions/books';

const EditBook = (props) => (
    <div className='container__box'>
        <BookForm
            book={props.book}
            onSubmitBook={(book) => {
                props.dispatch(editBook(props.book.id, book));
                props.history.push('/');
            }}
        />
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        book: state.find((book) =>
            book.id === props.match.params.id)
    };
};

export default connect(mapStateToProps)(EditBook);