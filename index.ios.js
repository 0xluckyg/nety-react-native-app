import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './src/main';
import {store} from './src/store';
import { Provider } from 'react-redux';

import codePush from "react-native-code-push";

export default class Nety extends React.Component {
	render() {
		return (			
			<Provider store={store}>
				<Main/>      		
			</Provider>
		);
	}
}
// Nety = codePush(Nety);


AppRegistry.registerComponent('NetyRN', () => Nety);
