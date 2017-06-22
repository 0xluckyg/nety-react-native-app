import { SET_SELF, SET_USER, UPDATE_SELF } from '../helper/constants.js'
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
        case UPDATE_SELF: 
            return {
                ...state,
                self: action.self
            }        
        case SET_USER:
            return {
                ...state,
                user: action.self
            }
        default:
            return state
    }
}