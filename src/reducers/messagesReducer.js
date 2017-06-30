import * as keys from '../helper/constants.js'
import Reactotron from 'reactotron-react-native'
import _ from 'lodash';

const initialState = {
    messages: {}
}

export default function (state = initialState, action) {    
    switch (action.type) {        
        case keys.RESOLVE_GET_MESSAGES:                                         
            if (!state.messages[action.chatroomId]) {
                state.messages[action.chatroomId] = [];        
            }
            return {                
                messages: state.messages[action.chatroomId].concat(action.messages)
            }
        case keys.RESOLVE_SEND_MESSAGE:            
            if (!state.messages[action.msg.chatroomId]) {
                state.messages[action.msg.chatroomId] = [];        
            }
            return {                
                messages: state.messages[action.msg.chatroomId].unshift(action.msg)
            }
        default:
            return state
    }
}