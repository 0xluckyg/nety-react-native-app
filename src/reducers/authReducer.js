import { SET_SELF, REMOVE_CONTACT } from '../helper/constants.js'
import _ from 'lodash';

const initialState = {
    self: []
}

export default function (state = initialState, action) {
   switch (action.type) {
        case SET_SELF:
            return {
                ...state,
                self: action.self
            }
        default:
            return state
    }
}