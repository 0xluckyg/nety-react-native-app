import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import Router from './src/components/routes';
import networkReducer from './src/reducers/networkReducer';
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

Reactotron
  .configure()
  .use(reactotronRedux())
  .connect()

const store = Reactotron.createStore(networkReducer, compose())

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