import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RestaurantManager from './containers/RestaurantManager'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" name="DevLayout" component={RestaurantManager} />
        <Redirect to='/'/>
      </Switch>
    );
  }
}

export default App;
