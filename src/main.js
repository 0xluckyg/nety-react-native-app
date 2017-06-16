import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Router from './components/routes';
import * as networkActions from './actions/networkActions';
import * as profileActions from './actions/profileActions';
import * as contactsActions from './actions/contactsActions';
import {AsyncStorage} from 'react-native';
// import initialUsers from './helper/initialUsers'

import { Provider } from 'react-redux';
import { combineReducers, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

import {MyColors} from './helper/style';
import Spinner from './components/reusables/spinner';
import Toast from './components/reusables/toast';

import Store from './store';

class Main extends Component {

    render() {
        return (
            <Provider store={Store}>
                <View style={styles.mainViewStyle}>
                    <Toast/>
                    <Router/>
                </View>
            </Provider>      
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1
    }
});

export default Main