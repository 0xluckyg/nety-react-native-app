import {AsyncStorage} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {SERVER} from '../helper/constants';
import { Actions } from 'react-native-router-flux'

import {store} from '../store';
import * as indicatorActions from '../actions/indicatorActions';
import * as authActions from '../actions/authActions';

import {onUpdateUser} from './profileSocket';
import { CONNECT_SOCKET } from '../helper/constants'

let initialState = {
    socket: {}
};

export default function (state = initialState, action) {        
    console.log('??', CONNECT_SOCKET);
    switch (action.type) {        
        case CONNECT_SOCKET:            
            state.socket = SocketIOClient(SERVER, {
                transports: ['websocket'],
                query: 'token=' + action.self.token + '&userId=' + action.self._id
            });    
            state.socket.on('connect', () => {        
                AsyncStorage.getItem('token').then(storageToken => {
                    if (!storageToken) {                        
                        saveToken(action.self.token, action.self._id);
                        store.dispatch(indicatorActions.showSpinner(false));
                        store.dispatch(indicatorActions.showToast(true));     
                    }
                });                   
                onGetByToken(state.socket);

                //IF USER DOESN'T EXIST IN PERSISTED DATA
                getByToken(state.socket);        
            })   
            return {...state}
        default:            
            return {...state}
    } 
}

function saveToken(token, id) {
    AsyncStorage.setItem('token', token).then(() => {                
        AsyncStorage.setItem('id', id).then(() => { 
            Actions.tabBar({type: 'replace'});
        });        
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

function getByToken(socket) {    
    socket.emit('/self/getByToken');
}

function emitUpdate(socket) {
    socket.emit('/self/update', self);
}

// module.exports = {
//     connect,
//     // getByToken,
//     // socket,
//     emitUpdate
// }