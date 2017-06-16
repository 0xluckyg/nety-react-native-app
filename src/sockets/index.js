import SocketIOClient from 'socket.io-client';
import {SERVER} from '../helper/constants';
import { Actions } from 'react-native-router-flux'

let socket;

function connect(token) {
    socket = SocketIOClient(SERVER, {
        transports: ['websocket'],
        query: 'token=' + token
    });    

    socket.on('connect', () => {
        Actions.tabBar({type: 'replace'});
    })
}

module.exports = {
    connect
}