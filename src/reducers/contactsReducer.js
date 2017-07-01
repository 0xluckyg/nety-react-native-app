import * as keys from '../helper/constants.js'
import _ from 'lodash';

const initialState = {
    contacts: []
}

export default function (state = initialState, action) {
   switch (action.type) {
        case keys.ADD_CONTACT:
            return {
                ...state,
                contacts: _.uniq([...state.contacts, ...action.users])
            }
        case keys.REMOVE_CONTACT:
            let ids = action.users.map( user => user.id )
            return {
                ...state,
                contacts: state.contacts.filter( user => !ids.includes(user.id) )
            }
        default:
            return state
    }
}