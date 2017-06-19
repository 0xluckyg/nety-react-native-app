import {AsyncStorage} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {SERVER} from '../helper/constants';
import { Actions } from 'react-native-router-flux'

import {store} from '../store';
import * as indicatorActions from '../actions/indicatorActions';
import * as authActions from '../actions/authActions';

let socket;

function connect(token) {

    socket = SocketIOClient(SERVER, {
        transports: ['websocket'],
        query: 'token=' + token
    });    

    socket.on('connect', () => {        
        AsyncStorage.getItem('token').then(storageToken => {
            if (!storageToken) {
                saveToken(token);
                store.dispatch(indicatorActions.showSpinner(false));
                store.dispatch(indicatorActions.showToast(true));     
            }
        });   

        onGetByToken(socket);

        //IF USER DOESN'T EXIST IN PERSISTED DATA
        getByToken();        
    })    
}

function saveToken(token) {
    AsyncStorage.setItem('token', token).then(() => {                
        Actions.tabBar({type: 'replace'});
    })                
}

function onGetByToken(socket) {
    socket.on('/self/getByToken/success', user => {        
        store.dispatch(authActions.resolveGetByToken(user));
    });

    socket.on('/self/getByToken/fail', err => {
        store.dispatch(indicatorActions.showToast(err));
    });
}

function getByToken() {    
    socket.emit('/self/getByToken');
}

module.exports = {
    connect,
    getByToken,
    socket
}