import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

import networkReducer from './src/reducers/networkReducer';
import profileReducer from './src/reducers/profileReducer';
import App from './src/App'

Reactotron
  .configure()
  .use(reactotronRedux())
  .connect()

const reducers = combineReducers({
      network: networkReducer, 
      profile: profileReducer
    })

const store = Reactotron.createStore(reducers, compose())

console.log("---------------")
console.log(store.getState())
console.log("---------------")

export default class Nety extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Nety', () => Nety);