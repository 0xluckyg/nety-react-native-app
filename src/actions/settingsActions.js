import * as actionTypes from './actionTypes'

export function blockUser(user) {
    return { type: actionTypes.BLOCK_USER, user }
}

export function unblockUser(user) {
    return { type: actionTypes.unblockUser, user}
}