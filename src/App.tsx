import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from './Containers/Auth/authcontext';

import Auth from './Containers/Auth/Auth';
import Reports from './Containers/Reports/Reports';
import Uploads from './Containers/Uploads';

import './App.css';

const App = () => {
    const auth = useContext(AuthContext);

    const content = auth.isAuthed ? (
        <Router>
            <Switch>
                <Route path='/' exact component={Reports} />
                <Route path='/uploads' component={Uploads} />
            </Switch>
        </Router>
    ) : (
        <Router>
            <Switch>
                <Route path='/auth' exact component={Auth} />
                <Redirect to='/auth' />
            </Switch>
        </Router>
    );

    return content;
};

export default App;
