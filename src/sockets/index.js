import * as keys from '../helper/constants'
import SocketIOClient from 'socket.io-client';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as indicatorActions from '../actions/indicatorActions';
import * as authActions from '../actions/authActions';

import {onUpdateUser, updateSelf} from './profileSocket';
import {onGetNetwork, onUpdateNetwork, getNetwork} from './networkSocket';
import {onChangeDiscoverable, changeDiscoverable, logout, onLogout} from './settingsSocket';
import {onGetMessages, onSendMessage, onGotMessage, sendMessage, getMessages} from './messagesSocket';
import {onGetChatrooms, getChatrooms, removeChatroom, onRemoveChatroom, readMessages, onReadMessages} from './chatroomsSocket';
import {getContacts, onGetContacts, removeContact, onRemoveContact, addContact, onAddContact } from './contactsSocket';

const socket = null;

export default function ({ dispatch }) {
    return next => action => {  
        switch (action.type) {
            case keys.CONNECT_SOCKET:
                connectSocket(action, dispatch, next);
                break;

            //PROFILE
            case keys.UPDATE_SELF:                
                updateSelf(socket, action.self);
                next(action);
                break;

            //NETWORK
            case keys.GET_NETWORK:
                getNetwork(socket);
                next(action);
                break;

            //CONTACTS
            case keys.GET_CONTACTS:
                getContacts(socket);
                next(action);
                break;
            case keys.ADD_CONTACT:                
                addContact(socket, action.userId);
                next(action);
                break;
            case keys.REMOVE_CONTACT:
                removeContact(socket);
                next(action);
                break;            

            //CHATS
            case keys.GET_CHATROOMS:
                getChatrooms(socket);
                next(action);
                break;            
            case keys.REMOVE_CHATROOM:
                removeChatroom(socket, action.chatroomId);
                next(action);
                break;    
            case keys.READ_MESSAGES:
                readMessages(socket, action.chatroomId);
                next(action);
                break;
            
            //MESSAGES
            case keys.SEND_MESSAGE:
                sendMessage(socket, action.msg);
                next(action);
                break;
            case keys.GET_MESSAGES:
                getMessages(socket, action.query);
                next(action);
                break;
                
            //SETTINGS
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

        //NETWORK
        onGetNetwork(socket, dispatch);

        //CONTACTS
        onGetContacts(socket, dispatch);
        onRemoveContact(socket, dispatch);
        onAddContact(socket, dispatch);

        //CHATS
        onGetChatrooms(socket, dispatch);        
        onRemoveChatroom(socket, dispatch);
        onReadMessages(socket, dispatch);

        //MESSAGES
        onGetMessages(socket, dispatch);
        onSendMessage(socket, dispatch);
        onGotMessage(socket, dispatch);

        //SETTINGS
        onChangeDiscoverable(socket, dispatch);
        onLogout(socket, dispatch);

        next(action);
    });

    socket.on('error', () => {        
        if (!socket.connected) {
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

function getByToken(socket, dispatch) {        
    socket.emit('/self/getByToken');
}

function onCriticalError(socket, dispatch) {
    socket.on('/criticalError', () => {
        backToMain();
    })   
}

function backToMain() {
    AsyncStorage.removeItem('token').then(() => {
        AsyncStorage.removeItem('id').then(() => {      
            dispatch(indicatorActions.showToast('Something went wrong! Please login again'));           
            Actions.splash({type: 'replace'});
        })
    }) 
}