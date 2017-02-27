import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Router from './src/components/routes';
import Network from './src/components/main';

export default class Nety extends Component {
  render() {
    return (
      <Router/>
    );
  }
}

AppRegistry.registerComponent('Nety', () => Nety);
