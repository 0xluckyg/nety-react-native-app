import { ADD_CONTACT, REMOVE_CONTACT } from '../actions/actionTypes.js'

const initialState = {
    contacts: []
}

export default function (state = initialState, action) {
   switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.user]
            }
        case REMOVE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(user => user.id != action.user.id)
            }
        default:
            return state
    }
}