import * as keys from '../helper/constants.js'
import _ from 'lodash'

const initialState = {
    blocked: [],
    discoverable: true
}

export default function (state = initialState, action) {    
   switch (action.type) {
        case keys.SET_SELF:
            return {
                ...state,
                blocked: action.self.blocked,
                discoverable: action.self.discoverable
            }
        case keys.RESOLVE_CHANGE_DISCOVERABLE:
            return {
                ...state,
                discoverable: action.discoverable
            }
        case keys.RESOLVE_BLOCK_USER:
            return {
                ...state,
                blocked: [...state.blocked, action.userId]
            }
        case keys.RESOLVE_UNBLOCK_USER:
            return {
                ...state,
                blocked: _.remove(state.blocked, action.userId)
            }
        default:
            return state
    }
}