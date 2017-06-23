import { CONNECT_SOCKET, UPDATE_SELF, SERVER } from '../helper/constants'
import SocketIOClient from 'socket.io-client';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as indicatorActions from '../actions/indicatorActions';
import * as authActions from '../actions/authActions';

import {onUpdateUser, updateSelf} from './profileSocket';

const socket = null;

export default function ({ dispatch }) {
    return next => action => {  
        switch (action.type) {
            case CONNECT_SOCKET:
                connectSocket(action, dispatch, next);
                break;
            case UPDATE_SELF:                
                updateSelf(socket, dispatch, action.self);
                next(action);
                break;
            default:
                next(action);
                break;
        }        
    }

}

function connectSocket(action, dispatch, next) {
    socket = SocketIOClient(SERVER, {
        transports: ['websocket'],
        query: 'token=' + action.self.token + '&userId=' + action.self._id
    });

    socket.on('connect', () => {
        AsyncStorage.getItem('token').then(storageToken => {
            if (!storageToken) {                            
                saveToken(action.self.token, action.self._id);                        
                dispatch(indicatorActions.showSpinner(false));
                dispatch(indicatorActions.showToast(true));                             
            }
        });                

        onGetByToken(socket, dispatch);

        //IF USER DOESN'T EXIST IN PERSISTED DATA
        getByToken(socket, dispatch);
        
        onUpdateUser(socket, dispatch);

        next(action);
    });
}

function saveToken(token, id) {
    AsyncStorage.setItem('token', token).then(() => {                
        AsyncStorage.setItem('id', id).then(() => { 
            Actions.tabBar({type: 'replace'});
        });        
    })                
}

function onGetByToken(socket, dispatch) {
    socket.on('/self/getByToken/success', user => {   
        console.log(user);
        dispatch(authActions.resolveGetByToken(user));
    });

    socket.on('/self/getByToken/fail', err => {
        dispatch(indicatorActions.showToast('Something went wrong!'));
    });
}

function getByToken(socket, dispatch) {    
    socket.emit('/self/getByToken');
}

