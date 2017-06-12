import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import Main from './src/main';

import networkReducer from './src/reducers/networkReducer';
import profileReducer from './src/reducers/profileReducer';
import settingsReducer from './src/reducers/settingsReducer';
import contactsReducer from './src/reducers/contactsReducer';

Reactotron
  .configure()
  .use(reactotronRedux())
  .connect()

const reducers = combineReducers({
      network: networkReducer, 
      profile: profileReducer,
      settings: settingsReducer,
      contacts: contactsReducer
});

const store = Reactotron.createStore(reducers, compose());

export default class App extends React.Component {
	render() {
    	return (
			<Provider store={store}>
				<Main />
      		</Provider>      
    	);
  	}
}
