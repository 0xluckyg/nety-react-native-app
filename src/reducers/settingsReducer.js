import { BLOCK_USER, UNBLOCK_USER } from '../helper/constants.js'

const initialState = {
    blockedUsers: []
}

export default function (state = initialState, action) {
   switch (action.type) {
        case BLOCK_USER:
            return {
                ...state,
                blockedUsers: [...state.blockedUsers, action.user]
            }
        case BLOCK_USER:
            return {
                ...state,
                blockedUsers: state.blockedUsers.filter(user => user.id != action.user.id)
            }
        default:
            return state
    }
}