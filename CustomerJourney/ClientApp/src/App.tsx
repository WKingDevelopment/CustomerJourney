import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConfigurationPage } from './components/pages/ConfigurationPage';

import './styling/test.scss'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <Route exact path='/' component={ConfigurationPage} />
      </div>
    );
  }
}
