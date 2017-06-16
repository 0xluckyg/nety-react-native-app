import React, { Component } from 'react';
import Main from './src/main';
import store from './src/store';
import { Provider } from 'react-redux';

export default class App extends React.Component {
	render() {
    	return (			
			<Provider store={store}>
				<Main/>      		
			</Provider>
    	);
  	}
}
