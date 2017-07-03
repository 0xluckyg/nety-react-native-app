import * as keys from '../helper/constants.js'
import _ from 'lodash';

const initialState = {
    chatrooms: []
}

function updateChatroom(chatrooms, message, fromSelf) {     
    console.log('CHATROOMS BEFORE', chatrooms);       
    console.log('MSG BEFORE', message);       
    var index = _.findIndex(chatrooms, {_id: message.chatroomId});
    let chatroom = {
        lastMessage: {}        
    }
    if (index >= 0) {
        chatroom = chatrooms[index];  
        chatrooms.splice(index, 1);     
    }    
    chatroom.updatedAt = message.updatedAt
    chatroom.lastMessage.text = message.text
    chatroom.lastMessage.sender = message.senderId
    chatroom.name = message.name    
    if (!fromSelf) {
        if (chatroom.unread) { chatroom.unread = 1 } else { chatroom.unread ++ }
    }    
    chatrooms = [chatroom].concat(chatrooms);    

    return chatrooms;
}

export default function (state = initialState, action) {
   switch (action.type) {
        case keys.RESOLVE_GET_CHATROOMS:         
            console.log('CHATROOMS', action.chatrooms);
            return {
                ...state,                
                chatrooms: action.chatrooms
            }        
        case keys.RESOLVE_REMOVE_CHATROOM:        
            return state

        case keys.RESOLVE_SEND_MESSAGE:  
            const chatrooms = updateChatroom(state.chatrooms, action.msg, true)
            return {
                chatrooms 
            }
        case keys.GOT_MESSAGE:
            return {
                chatrooms: updateChatroom(state.chatrooms, action.msg, false)
            }

        default:
            return state
    }
}