import * as keys from '../helper/constants.js'

//query: { start: startFromIndex, chatroomId: idOfChatroom }
export function getChatrooms(query) {
    return { type: keys.GET_CHATROOMS }
}

export function resolveGetChatrooms(chatrooms) {
    return { 
        type: keys.RESOLVE_GET_CHATROOMS, 
        chatrooms
    }
}

export function removeChatroom(chatroomId) {
    return { 
        type: keys.REMOVE_CHATROOM, 
        chatroomId
    }
}

export function resolveRemoveChatroom(chatroomId) {
    return { 
        type: keys.RESOLVE_REMOVE_CHATROOM, 
        chatroomId
    }
}