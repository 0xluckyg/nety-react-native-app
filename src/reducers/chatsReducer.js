import * as keys from '../helper/constants.js'
import _ from 'lodash';

const initialState = {
    chatrooms: []
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
        default:
            return state
    }
}