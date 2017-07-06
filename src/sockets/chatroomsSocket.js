import * as chatsActions from '../actions/chatsActions';
import * as indicatorActions from '../actions/indicatorActions';

function onGetChatrooms(socket, dispatch) {
    socket.on('/self/getChatrooms/success', chatrooms => {        
        dispatch(chatsActions.resolveGetChatrooms(chatrooms));
    })

    socket.on('/self/getChatrooms/fail', err => {        
        
    })
}

function getChatrooms(socket) {
    socket.emit('/self/getChatrooms');
}

function removeChatroom(socket, chatroomId) {
    socket.emit('/self/deleteChat', chatroomId);
}

function onRemoveChatroom(socket, dispatch) {
    socket.on('/self/deleteChat/success', chatroomId => {
        dispatch(chatsActions.resolveRemoveChatroom(chatroomId));
    });
    socket.on('/self/deleteChat/fail', err => {
        dispatch(indicatorActions.showToast('Could not delete chats. Please try again later'));
    });
}

function readMessages(socket, chatroomId) {
    socket.emit('/self/readMessage', chatroomId);
}

function onReadMessages(socket, dispatch) {
    socket.on('/self/readMessage/success', chatroomId => {
        dispatch(chatsActions.resolveReadMessages(chatroomId));
    });
    socket.on('/self/readMessage/fail', err => {
        
    });
}

module.exports = {    
    onGetChatrooms,
    getChatrooms,
    removeChatroom,
    onRemoveChatroom,
    readMessages,
    onReadMessages
}