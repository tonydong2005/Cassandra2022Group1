import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import KeyspaceDashBoard from '../components/KeyspaceDashBoard';
import TableDashBoard from '../components/TableDashBoard';
import AddBook from '../components/AddBook';
import EditBook from '../components/EditBook';
import NotFound from '../components/NotFound';
import { useParams } from 'react-router-dom';

const AppRouter = () => (
    <BrowserRouter>
        <div className='container'>
            <Header />
            <Switch>
                <Route path="/" component={KeyspaceDashBoard} exact={true} />
                <Route path="/keyspaces/:keyspaceName" component={TableDashBoard} exact={true} />
                <Route path="/add" component={AddBook} />
                <Route path="/book/:id" component={EditBook} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;