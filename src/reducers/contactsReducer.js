import { ADD_CONTACT, REMOVE_CONTACT } from '../actions/actionTypes.js'

const initialState = {
    contacts: []
}

export default function (state = initialState, action) {
   switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, ...action.users]
            }
        case REMOVE_CONTACT:
            let ids = action.users.map( user => user.id )
            return {
                ...state,
                contacts: state.contacts.filter( user => !ids.includes(user.id) )
            }
        default:
            return state
    }
}