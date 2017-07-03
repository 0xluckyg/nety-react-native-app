import * as contactsActions from '../actions/contactsActions';
import * as indicatorActions from '../actions/indicatorActions';

function getContacts(socket) {
    socket.emit('/self/getContacts');
}

function onGetContacts(socket, dispatch) {
    socket.on('/self/getContacts/success', contacts => {        
        dispatch(contactsActions.resolveGetContacts(contacts));
    })

    socket.on('/self/getContacts/fail', err => {        
        console.log(err);
    })
}

function removeContact(socket, userId) {
    socket.emit('/self/deleteContact', userId);
}

function onRemoveContact(socket) {
    socket.on('/self/deleteContact/success', userId => {
        dispatch(contactsActions.resolveRemoveContact(userId));
        dispatch(indicatorActions.showToast(true));
    });

    socket.on('/self/deleteContact/fail', err => {
        dispatch(indicatorActions.showToast('Could not delete contact. Please try again later'));
    });
}

function addContact(socket, userId) {    
    socket.emit('/self/addContact', userId);    
}

function onAddContact(socket, dispatch) {
    socket.on('/self/addContact/success', user => {        
        dispatch(contactsActions.resolveAddContact(user));
        dispatch(indicatorActions.showToast(true));
    });

    socket.on('/self/addContact/fail', err => {                
        dispatch(indicatorActions.showToast('Could not add contact. Please try again later'));
    });
}

module.exports = {    
    getContacts,
    onGetContacts,
    removeContact,
    onRemoveContact,
    addContact,
    onAddContact
}