import { SET_SELF } from '../helper/constants.js'
import _ from 'lodash'

const initialState = {
    self: {}
}

export default function (state = initialState, action) {        
   switch (action.type) {
        case SET_SELF:

            _.omit(action.self, ['discoverable', 'blocked']);

            return {
                ...state,
                currentUser: action.self
            }
        default:
            return state
    }
}