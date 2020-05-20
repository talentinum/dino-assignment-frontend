import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Todo from './pages/Todo';

import './global.sass';

render(
  <Router>
    <div>
      <Switch>
        <Route path="/list" component={Todo} />
        <Route path="/signup" component={Signup} />
        <Route component={Login} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
);
