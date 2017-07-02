import * as keys from '../helper/constants.js'

//query: { 
//     start: startFromIndex, 
//     chatroomId: idOfChatroom 
// }
export function getChatrooms(query) {
    return { type: keys.GET_CHATROOMS }
}

// chatrooms = [{
//     _id: '5950043a3cee24070d35a32159567cfb9bcd7a6b07c5c25b',
//     lastMessage: { text: 'Hmmm..', sender: '59567cfb9bcd7a6b07c5c25b' },
//     updatedAt: '2017-07-01T18:40:42.129Z',
//     unread: 0,
//     name: { last: 'last7', first: 'first7' },
//     picture: null,
//     senderId: '5950043a3cee24070d35a333'
// }]
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