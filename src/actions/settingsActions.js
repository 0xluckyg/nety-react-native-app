import {CHANGE_DISCOVERABLE, 
        RESOLVE_CHANGE_DISCOVERABLE, 
        BLOCK_USER, 
        RESOLVE_BLOCK_USER,
        UNBLOCK_USER,
        RESOLVE_UNBLOCK_USER,
        BLOCKED,
        LOGOUT,
        RESOLVE_LOGOUT} from '../helper/constants.js'

export function changeDiscoverable(discoverable) {    
    return { type: CHANGE_DISCOVERABLE, discoverable }
}

export function resolveChangeDiscoverable(discoverable) {    
    return { type: RESOLVE_CHANGE_DISCOVERABLE, discoverable }
}

export function blockUser(user) {
    return { type: BLOCK_USER, user }
}

export function resolveBlockUser(user) {
    return { type: RESOLVE_BLOCK_USER, user }
}

export function unblockUser(user) {
    return { type: UNBLOCK_USER, user}
}

export function resolveUnblockUser(user) {
    return { type: RESOLVE_UNBLOCK_USER, user}
}

export function blocked(user) {
    return { type: BLOCKED, user }
}

export function logout() {    
    return {type: LOGOUT}
}