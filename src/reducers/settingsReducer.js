import { BLOCK_USER, UNBLOCK_USER, SET_SELF } from '../helper/constants.js'
import _ from 'lodash'

const initialState = {
    blocked: [],
    discoverable: true
}

export default function (state = initialState, action) {    
   switch (action.type) {
        case SET_SELF:
            return {
                ...state,
                blocked: action.self.blocked,
                discoverable: action.self.discoverable
            }
        case BLOCK_USER:
            return {
                ...state,
                blocked: [...state.blocked, action.userId]
            }
        case UNBLOCK_USER:
            return {
                ...state,
                blocked: _.remove(state.blocked, action.userId)
            }
        default:
            return state
    }
}