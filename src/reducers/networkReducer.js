import { ADD_TO_NETWORK, REMOVE_FROM_NETWORK } from '../actions/networkActions.js'

const initialState = {
    network: [],
    range: 50
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_NETWORK:
            return {
                ...state,
                network: [...state.network, ...action.newUsers]
            }
        case REMOVE_FROM_NETWORK:
            let ids = action.removedUsers.map( user => user.id )
            return {
                ...state,
                network: state.network.filter( user => !ids.includes(user.id) )
            }
        default:
            return state
    }
}