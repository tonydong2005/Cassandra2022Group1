import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import getAppStore from './store/store';
import { getBooks } from './actions/books';
import { getKeyspaces } from './actions/keyspaces';
import './styles/styles.scss';

import { Provider } from 'react-redux';

import { combineActions } from 'redux-actions';

const store = getAppStore();

const template = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

store.dispatch(getBooks());
store.dispatch(getKeyspaces()).then(() => {
    ReactDOM.render(template, document.getElementById('app'));
});