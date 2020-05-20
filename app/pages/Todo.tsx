import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Add from './Add';
import Edit from './Edit';
import List from './List';

class Todo extends Component<{} & RouteComponentProps> {
  public render(): ReactNode {
    return (
      <Switch>
        <Route path="/list/new" exact component={Add} />
        <Route path="/list/edit/:key" exact component={Edit} />
        <Route component={List} />
      </Switch>
    );
  }
}

export default withRouter(Todo);
