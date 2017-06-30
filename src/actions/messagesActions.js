import * as keys from '../helper/constants.js'

//query: { start: startFromIndex, chatroomId: idOfChatroom }
export function getMessages(query) {
    return { type: keys.GET_MESSAGES, query }
}

export function resolveGetMessages(messages) {
    return { 
        type: keys.RESOLVE_GET_MESSAGES, 
        messages: messages.messages, 
        chatroomId: messages.chatroomId  
    }
}

//msg: { chatroomId, text, toId }
export function sendMessage(msg) {
    return { type: keys.SEND_MESSAGE, msg }
}

export function resolveSendMessage(msg) {
    return { type: keys.RESOLVE_SEND_MESSAGE, msg }
}

export function gotMessage(msg) {
    return { type: keys.GOT_MESSAGE, msg }    
}