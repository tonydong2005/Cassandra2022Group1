import { createStore, applyMiddleware } from "redux";
import books from '../reducers/books';
import thunk from 'redux-thunk';

export default () => {
    return createStore(books, applyMiddleware(thunk));
};