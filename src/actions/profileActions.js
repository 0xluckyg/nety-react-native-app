import * as actionTypes from './actionTypes'

export function setCurrentUser(user) {
    return { type: actionTypes.SET_CURRENT_USER, user }
}

export function updateCurrentUser(data) {
    return { type: actionTypes.UPDATE_CURRENT_USER, data}
}