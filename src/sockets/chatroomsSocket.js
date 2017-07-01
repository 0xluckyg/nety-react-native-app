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

module.exports = {    
    onGetChatrooms,
    getChatrooms,
    removeChatroom,
    onRemoveChatroom 
}