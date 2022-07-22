import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import getAppStore from './store/store';
import { getBooks } from './actions/books';
import { getKeyspaces } from './actions/keyspaces';
import { getTables } from './actions/tables';
import './styles/styles.scss';


import 'ag-grid-community/dist/styles/ag-theme-blue.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-grid.css'; // Optional theme CSS

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