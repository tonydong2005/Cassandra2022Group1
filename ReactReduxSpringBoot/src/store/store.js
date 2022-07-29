import { createStore, applyMiddleware } from "redux";
import books from '../reducers/books';
import keyspaces from '../reducers/keyspaces'
import reducers from '../reducers/index'
import thunk from 'redux-thunk';

export default () => {
    return createStore(reducers, applyMiddleware(thunk));
};