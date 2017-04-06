import { ADD_TO_NETWORK, REMOVE_FROM_NETWORK } from '../actions/actionTypes.js'
import Reactotron from 'reactotron-react-native'

const initialState = {
    network: [],
    range: 50
}

export default function (state = initialState, action) {
    // Reactotron.error({
    //             ...state,
    //             network: action.users
    //         })
    switch (action.type) {
        case ADD_TO_NETWORK:
            return {
                ...state,
                network: [...state.network, ...action.users]
            }
        case REMOVE_FROM_NETWORK:
            let ids = action.users.map( user => user.id )
            return {
                ...state,
                network: state.network.filter( user => !ids.includes(user.id) )
            }
        default:
            return state
    }
}