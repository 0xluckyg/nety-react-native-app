import {ADD_CONTACT, REMOVE_CONTACT} from '../helper/constants.js'

export function addToContacts(users) {
    return { type: ADD_CONTACT, users }
}

export function removeFromContacts(users) {
    return { type: REMOVE_CONTACT, users }
}