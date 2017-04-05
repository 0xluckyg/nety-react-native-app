import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Router from './src/components/routes';
import networkReducer from './src/reducers/networkReducer';

const store = createStore(networkReducer)

export default class Nety extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Nety', () => Nety);
