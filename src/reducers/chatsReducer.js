import * as keys from '../helper/constants.js'
import _ from 'lodash';

const initialState = {
    chatrooms: []
}

function updateChatroom(chatrooms, message, fromSelf) {    
    var index = _.findIndex(chatrooms, {_id: message.chatroomId});
    const chatroom = chatrooms[index];
    chatroom.updatedAt = message.updatedAt
    chatroom.lastMessage.text = message.text
    chatroom.lastMessage.sender = message.senderId
    if (!fromSelf) {chatroom.unread ++}
    
    chatrooms.splice(index, 1);
    chatrooms = [chatroom].concat(chatrooms);    

    return chatrooms;
}

export default function (state = initialState, action) {
   switch (action.type) {
        case keys.RESOLVE_GET_CHATROOMS:
            console.log('chatrooms',action.chatrooms);
            return {
                ...state,                
                chatrooms: action.chatrooms
            }        
        case keys.RESOLVE_REMOVE_CHATROOM:        
            return state

        // case keys.RESOLVE_SEND_MESSAGE:            
        //     return {
        //         chatrooms: updateChatroom(state.chatrooms, action.msg, true)
        //     }
        // case keys.GOT_MESSAGE:
        //     return {
        //         chatrooms: updateChatroom(state.chatrooms, action.msg, false)
        //     }

        default:
            return state
    }
}