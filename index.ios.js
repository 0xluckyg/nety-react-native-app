import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Main from './src/components/main';

export default class Nety extends Component {
  render() {
    return (
      <Main/>
    );
  }
}

AppRegistry.registerComponent('Nety', () => Nety);
