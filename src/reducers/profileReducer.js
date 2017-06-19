import { SET_SELF, SET_USER } from '../helper/constants.js'
import _ from 'lodash'

const initialState = {
    self: {},
    user: {}
}

export default function (state = initialState, action) {        
   switch (action.type) {
        case SET_SELF:

            _.omit(action.self, ['discoverable', 'blocked']);

            return {
                ...state,
                self: action.self
            }
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}