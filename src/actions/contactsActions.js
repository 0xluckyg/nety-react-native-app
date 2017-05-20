import * as actionTypes from './actionTypes'

export function addToContacts(users) {
    return { type: actionTypes.ADD_CONTACT, users }
}

export function removeFromContacts(users) {
    return { type: actionTypes.REMOVE_CONTACT, users }
}

