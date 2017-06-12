import {ADD_TO_NETWORK, REMOVE_FROM_NETWORK, UPDATE_RANGE} from '../helper/constants.js'

export function addToNetwork(users) {
    return { type: ADD_TO_NETWORK, users }
}

export function removeFromNetwork(users) {
    return { type: REMOVE_FROM_NETWORK, users }
}

export function updateRange(rangeValue) {
    return { type: UPDATE_RANGE, rangeValue }
}