import {SET_CURRENT_USER, UPDATE_CURRENT_USER} from '../helper/constants.js'

export function setCurrentUser(user) {
    return { type: SET_CURRENT_USER, user }
}

export function updateCurrentUser(data) {
    return { type: UPDATE_CURRENT_USER, data}
}