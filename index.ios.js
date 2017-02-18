import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './src/app';

export default class Nety extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('Nety', () => Nety);
