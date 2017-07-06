import * as keys from '../helper/constants.js'
import _ from 'lodash';

const initialState = {
    chatrooms: []
}

function updateChatroom(chatrooms, message, fromSelf) {         
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

function readMessages(chatrooms, chatroomId) {   
    console.log('CHATROOMS1', chatrooms);      
    var index = _.findIndex(chatrooms, {_id: chatroomId});        
    if (index >= 0) {
        chatrooms[index].unread = 0;
    }                
    console.log('CHATROOMS', chatrooms);
    return chatrooms;
}

function updateIsContact(chatrooms, userId, bool) {
    var index = _.findIndex(chatrooms, {senderId: userId});
    if (index >= 0) {
        chatroom = chatrooms[index];  
        chatroom.isContact = bool;
        chatrooms.splice(index, 1, chatroom);
    }    
    return chatrooms;
}

export default function (state = initialState, action) {
   switch (action.type) {
        case keys.RESOLVE_GET_CHATROOMS:                     
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
        case keys.RESOLVE_READ_MESSAGES:
            console.log('ACT', action);
            return {
                chatrooms: readMessages(state.chatrooms, action.chatroomId)
            }

        case keys.RESOLVE_ADD_CONTACT:
            return {
                chatrooms: updateIsContact(state.chatrooms, action.userId, true)
            }
        case keys.RESOLVE_REMOVE_CONTACT:
            return {
                chatrooms: updateIsContact(state.chatrooms, action.userId, false)
            }        

        default:
            return state
    }
}