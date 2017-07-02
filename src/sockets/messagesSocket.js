import * as messagesActions from '../actions/messagesActions';
import * as indicatorActions from '../actions/indicatorActions';

function onGetMessages(socket, dispatch) {
    socket.on('/self/getMessages/success', messages => {        
        dispatch(messagesActions.resolveGetMessages(messages));
    })

    socket.on('/self/getMessages/fail', err => {        
        
    })
}

function onSendMessage(socket, dispatch) {
    socket.on('/self/sendMessage/success', msg => {        
        dispatch(messagesActions.resolveSendMessage(msg));
    });

    socket.on('/self/sendMessage/fail', err => {
        dispatch(indicatorActions.showToast('Could not send message. Please try again later'));
    });    
}

function onGotMessage(socket, dispatch) {
    socket.on('/user/message', msg => {
        dispatch(messagesActions.gotMessage(msg));
    });
}

function sendMessage(socket, msg) {
    socket.emit('/self/sendMessage', msg);
}

function getMessages(socket, query) {
    socket.emit('/self/getMessages', query);
}

module.exports = {
    onGetMessages,
    onSendMessage,
    onGotMessage,
    sendMessage,
    getMessages
}