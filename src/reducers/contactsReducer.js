import * as keys from '../helper/constants.js'
import _ from 'lodash';

const initialState = {
    contacts: []
}

function sortContacts(contacts) {
    contacts.sort((a, b) => {
        return a.name.first.localeCompare(b.name.first);
    });
    return contacts;
}

export default function (state = initialState, action) {
   switch (action.type) {
        case keys.RESOLVE_GET_CONTACTS:
            console.log('GOT CONTACTS', action.contacts);
            return {                
                contacts: action.contacts
            }
        case keys.RESOLVE_ADD_CONTACT:
            let addContacts = _.uniqBy([...state.contacts, ...[action.user]], '_id');
            addContacts = sortContacts(addContacts);
            console.log('ADD', action.user);
            console.log('ADD', addContacts)
            return {                
                contacts: addContacts
            }            
        case keys.RESOLVE_REMOVE_CONTACT:            
            let removeContacts = state.contacts.filter( contact => contact._id.toString() !== action.userId.toString() );
            return {                
                contacts: removeContacts
            }
        default:
            return state
    }
}