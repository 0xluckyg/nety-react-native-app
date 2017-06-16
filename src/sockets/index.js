import {AsyncStorage} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {SERVER} from '../helper/constants';
import { Actions } from 'react-native-router-flux'

import store from '../store';
import * as indicatorActions from '../actions/indicatorActions';

let socket;

function connect(token) {
    socket = SocketIOClient(SERVER, {
        transports: ['websocket'],
        query: 'token=' + token
    });    

    socket.on('connect', () => {
        store.dispatch(indicatorActions.showToast(true));
        store.dispatch(indicatorActions.showSpinner(true));        

        AsyncStorage.getItem('token').then(storageToken => {
            if (!storageToken) {
                saveToken();
            }
        });

        function saveToken() {
            AsyncStorage.setItem('token', token).then(() => {                
                Actions.tabBar({type: 'replace'});
            })                
        }   
    })
}

module.exports = {
    connect
}