// src/routes.js
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ApplyNowTemplate from './components/apply-now-template/apply-now-template';
import ApplyNowVanilla from './components/apply-now-template/apply-now-vanilla';
import S3ImageUpload from './components/S3ImageUpload';
import ApplicationsTable from './components/applications-table';
import NotFound from './components/404';
import Login from './components/login';
import ProtectedRoute from './utilities/ProtectedRoute';

const Routes = (props) => (
    <Router {...props}>
        <Switch>
            <ProtectedRoute path="/applications" component={ApplicationsTable} />
            {/* <Route exact path="/applications" component={ApplicationsTable} /> */}
            {/* <Route exact path="/apply-now-template" component={ApplyNowTemplate}/> */}
            <Route exact path="/apply-now" component={ApplyNowVanilla}/>
            <Route exact path="/login" component={Login}/>
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;