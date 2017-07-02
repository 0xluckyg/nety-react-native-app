import * as keys from '../helper/constants.js'
import Reactotron from 'reactotron-react-native'
import _ from 'lodash';

const initialState = {
    messages: {}
}


function formatMessages(messages, chatroomId) {        
    if (messages && messages.length > 0) {        
        const formattedMessages = messages.map(msg => {
            return {
                text: msg.text,
                createdAt: msg.createdAt,
                _id: msg._id,
                user: {
                    _id: msg.senderId                    
                }
            }
        });        

        return formattedMessages
    } else {
        return []
    }
}

function formatMessage(msg, chatroomId) {
    if (msg) {                
        return {
            text: msg.text,
            createdAt: msg.createdAt,
            _id: msg._id,
            user: {
                _id: msg.senderId                    
            }
        }        
    }
}

export default function (state = initialState, action) {    
    switch (action.type) {        
        case keys.RESOLVE_GET_MESSAGES:
            console.log('messages',action);  
            if (!state.messages[action.chatroomId]) {
                state.messages[action.chatroomId] = [];        
            }                        
            const resolveGetMessages = {
                ...state.messages                
            }     
            resolveGetMessages[action.chatroomId] = state.messages[action.chatroomId].concat(
                formatMessages(action.messages, action.chatroomId)
            );                   
            return {                
                messages: resolveGetMessages
            }
        case keys.RESOLVE_SEND_MESSAGE:            
            if (!state.messages[action.msg.chatroomId]) {
                state.messages[action.msg.chatroomId] = [];        
            }
            const resolveSendMessages = {
                ...state.messages                
            }     
            resolveSendMessages[action.msg.chatroomId] = [formatMessage(action.msg, action.msg.chatroomId)].concat(
                state.messages[action.msg.chatroomId]                
            );            
            return {                
                messages: resolveSendMessages
            }
        default:
            return state
    }
}