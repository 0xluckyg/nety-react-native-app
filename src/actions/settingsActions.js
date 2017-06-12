import {BLOCK_USER, UNBLOCK_USER} from '../helper/constants.js'

export function blockUser(user) {
    return { type: BLOCK_USER, user }
}

export function unblockUser(user) {
    return { type: UNBLOCK_USER, user}
}