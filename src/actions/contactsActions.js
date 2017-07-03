import * as keys from '../helper/constants.js'

export function getContacts() {
    return {type: keys.GET_CONTACTS}
}

export function resolveGetContacts(contacts) {
    return {type: keys.RESOLVE_GET_CONTACTS, contacts}
}

export function addContact(userId) {    
    return { type: keys.ADD_CONTACT, userId }
}

export function resolveAddContact(user) {
    return { type: keys.RESOLVE_ADD_CONTACT, user }
}

export function removeContact(userId) {
    return { type: keys.REMOVE_CONTACT, userId }
}

export function resolveRemoveContact(user) {
    return { type: keys.RESOLVE_REMOVE_CONTACT, user }
}