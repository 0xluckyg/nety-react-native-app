import * as keys from '../helper/constants'
import SocketIOClient from 'socket.io-client';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as indicatorActions from '../actions/indicatorActions';
import * as authActions from '../actions/authActions';
import {onUpdateUser, updateSelf} from './profileSocket';
import {onChangeDiscoverable, changeDiscoverable, logout, onLogout} from './settingsSocket';

const socket = null;

export default function ({ dispatch }) {
    return next => action => {  
        switch (action.type) {
            case keys.CONNECT_SOCKET:
                connectSocket(action, dispatch, next);
                break;
            case keys.UPDATE_SELF:                
                updateSelf(socket, dispatch, action.self);
                next(action);
                break;


            case keys.CHANGE_DISCOVERABLE:
                changeDiscoverable(socket, dispatch, action.discoverable);
                next(action);
                break;
            case keys.LOGOUT:
                logout(socket, dispatch);
                next(action);
                break;
            default:
                next(action);
                break;
        }        
    }
}

function connectSocket(action, dispatch, next) {    
    socket = SocketIOClient(keys.SERVER, {
        transports: ['websocket'],
        query: 'token=' + action.self.token + '&userId=' + action.self._id
    });    
    
    if (!socket.connected) {
        backToMain();
    }

    socket.on('connect', () => {        
        AsyncStorage.getItem('token').then(storageToken => {
            if (!storageToken) {                            
                saveToken(action.self.token, action.self._id);                        
                dispatch(indicatorActions.showSpinner(false));
                dispatch(indicatorActions.showToast(true));                             
            }
        });                

        //IF USER DOESN'T EXIST IN PERSISTED DATA
        getByToken(socket, dispatch);

        //USER
        onGetByToken(socket, dispatch);        
        onCriticalError(socket,dispatch);

        //PROFILE
        onUpdateUser(socket, dispatch);

        //SETTINGS
        onChangeDiscoverable(socket, dispatch);
        onLogout(socket, dispatch);

        next(action);
    });

    socket.on('error', () => {        
        if (!socket.socket.connected) {
            backToMain();
        }
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
        dispatch(authActions.resolveGetByToken(user));
    });

    socket.on('/self/getByToken/fail', err => {        
        dispatch(indicatorActions.showToast('Something went wrong!'));
    });
}

function onCriticalError(socket, dispatch) {
    socket.on('/criticalError', () => {
        backToMain();
    })   
}

function getByToken(socket, dispatch) {        
    socket.emit('/self/getByToken');
}

function backToMain() {
    AsyncStorage.removeItem('token').then(() => {
        AsyncStorage.removeItem('id').then(() => {      
            dispatch(indicatorActions.showToast('Something went wrong! Please login again'));           
            Actions.splash({type: 'replace'});
        })
    }) 
}