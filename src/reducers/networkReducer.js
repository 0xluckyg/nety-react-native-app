import { ADD_TO_NETWORK, REMOVE_FROM_NETWORK, UPDATE_RANGE } from '../actions/actionTypes.js'
import Reactotron from 'reactotron-react-native'
import _ from 'lodash';

const initialState = {
    network: [],
    range: 3
}

export default function (state = initialState, action) {
   console.log(action.type)
   console.log(action.rangeValue)
   switch (action.type) {
        case ADD_TO_NETWORK:
            return {
                ...state,
                network:  _.uniq([...state.network, ...action.users])
            }
        case REMOVE_FROM_NETWORK:
            let ids = action.users.map( user => user.id )
            return {
                ...state,
                network: state.network.filter( user => !ids.includes(user.id) )
            }
        case UPDATE_RANGE:            
            return {
                ...state,
                range: action.rangeValue
            }
        default:
            return state
    }
}