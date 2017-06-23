import * as profileActions from '../actions/profileActions';
import * as indicatorActions from '../actions/indicatorActions';

function onUpdateUser(socket, dispatch) {
    socket.on('/self/update/success', user => {
        dispatch(profileActions.resolveUpdateSelf(user));
    })

    socket.on('/self/update/fail', err => {        
        dispatch(indicatorActions.showToast('Could not update. Please try again later'));
    })

    socket.on('/user/update', user => {
        dispatch(profileActions.resolveUpdateUser(user));
    })    
}

function updateSelf(socket, dispatch, self) {
    socket.emit('/self/update', self);
}

module.exports = {
    onUpdateUser,
    updateSelf
}