import * as keys from '../helper/constants.js'
import Reactotron from 'reactotron-react-native'
import _ from 'lodash';

const initialState = {
    network: [],
    range: 3
}

export default function (state = initialState, action) {
   switch (action.type) {
        case keys.RESOLVE_GET_NETWORK:            
            return {
                ...state,
                network: action.users
            }
        case keys.ADD_TO_NETWORK:
            return {
                ...state,
                network:  _.uniq([...state.network, ...action.users])
            }        
        case keys.REMOVE_FROM_NETWORK:
            let ids = action.users.map( user => user.id )
            return {
                ...state,
                network: state.network.filter( user => !ids.includes(user.id) )
            }
        case keys.UPDATE_RANGE:            
            return {
                ...state,
                range: action.rangeValue
            }
        default:
            return state
    }
}