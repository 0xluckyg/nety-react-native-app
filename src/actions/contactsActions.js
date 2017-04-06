import * as actionTypes from './actionTypes'

export function addToContacts(user) {
    return { type: actionTypes.ADD_CONTACT, user }
}

export function removeFromContacts(user) {
    return { type: actionTypes.REMOVE_CONTACT, user }
}

