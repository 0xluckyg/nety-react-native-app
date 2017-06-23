import {AsyncStorage} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {SERVER} from '../helper/constants';
import { Actions } from 'react-native-router-flux'

import {store} from '../store';
import * as indicatorActions from '../actions/indicatorActions';
import * as authActions from '../actions/authActions';

// import {onUpdateUser} from './profileSocket';
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
                console.log('why??!')     
                onUpdateUser(state.socket);
                console.log('why?')     
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
        console.log(user);
        store.dispatch(authActions.resolveGetByToken(user));
    });

    socket.on('/self/getByToken/fail', err => {
        store.dispatch(indicatorActions.showToast(err));
    });
}

function getByToken(socket) {    

    console.log('sOCK');

    socket.emit('/self/getByToken');

    console.log('sOCK?');
}

function emitUpdate(socket) {
    socket.emit('/self/update', self);
}

function onUpdateUser(socket) {
    // const socket = store.getState()
    console.log('sOCK',socket);

    socket.on('/self/update/success', user => {
        store.dispatch(profileActions.resolveUpdateSelf(user));
    })

    socket.on('/user/update', user => {
        store.dispatch(profileActions.resolveUpdateUser(user));
    })

    socket.on('/self/update/fail', err => {
        store.dispatch(indicatorActions.showToast('Could not update. Please try again later'));
    })
}