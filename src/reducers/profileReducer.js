import { SET_CURRENT_USER } from '../actions/actionTypes.js'

const initialState = {
    currentUser: {}
}

export default function (state = initialState, action) {
   switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            }
        default:
            return state
    }
}