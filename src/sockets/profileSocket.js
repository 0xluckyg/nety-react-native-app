import {store} from '../store';
import * as profileActions from '../actions/profileActions';
import * as indicatorActions from '../actions/indicatorActions';

function onUpdateUser(socket) {
    // const socket = store.getState()
    console.log('sOCK',socket);

    socket.on('/self/update/success', user => {
        store.dispatch(profileActions.resolveUpdateSelf(user));
    })

    socket.on('/user/update', user => {
        store.dispatch(profileActions.resolveUpdateUser(user));
    })

    socket.on('/self/update/fail', err => {
        store.dispatch(indicatorActions.showToast('Could not update. Please try again later'));
    })
}

module.exports = {
    onUpdateUser
}