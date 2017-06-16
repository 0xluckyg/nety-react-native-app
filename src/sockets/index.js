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
        AsyncStorage.getItem('token').then(storageToken => {
            if (!storageToken) {
                saveToken();
                store.dispatch(indicatorActions.showSpinner(false));
                store.dispatch(indicatorActions.showToast(true));     
            }
        });

        function saveToken() {
            AsyncStorage.setItem('token', token).then(() => {                
                Actions.tabBar({type: 'replace'});
            })                
        }   

        onGetByToken(socket);

        //IF USER DOESN'T EXIST IN PERSISTED DATA
        getByToken();        
    })    
}

function onGetByToken(socket) {
    socket.on('/self/getByToken/success', user => {
        console.log(user);
    });

    socket.on('/self/getByToken/fail', err => {
        console.log(err);
    });
}


function getByToken() {    
    socket.emit('/self/getByToken');
}

module.exports = {
    connect,
    getByToken
}