import * as keys from '../helper/constants.js'

export function addContact(users) {
    return { type: keys.ADD_CONTACT, users }
}

export function resolveAddContact(users) {
    return { type: keys.RESOLVE_ADD_CONTACT, users }
}

export function removeContact(users) {
    return { type: keys.REMOVE_CONTACT, users }
}

export function resolveRemoveContact(users) {
    return { type: keys.RESOLVE_REMOVE_CONTACT, users }
}