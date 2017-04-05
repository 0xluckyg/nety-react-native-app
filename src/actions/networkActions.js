import * as actionTypes from './actionTypes'

export function addToNetwork(users) {
    return { type: actionTypes.ADD_TO_NETWORK, users }
}

export function removeFromNetwork(users) {
    return { type: actionTypes.REMOVE_FROM_NETWORK, users }
}