import * as keys from '../helper/constants.js'

export function getNetwork() {
    return { type: keys.GET_NETWORK }
}

export function resolveGetNetwork(users) {
    return { type: keys.RESOLVE_GET_NETWORK, users }
}

export function updateLocation(loc) {
    return { type: keys.UPDATE_LOCATION, loc }
}

export function addToNetwork(users) {
    return { type: keys.ADD_TO_NETWORK, users }
}

export function removeFromNetwork(users) {
    return { type: keys.REMOVE_FROM_NETWORK, users }
}

export function updateRange(rangeValue) {
    return { type: keys.UPDATE_RANGE, rangeValue }
}