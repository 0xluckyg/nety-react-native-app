import * as settingsActions from '../actions/settingsActions';
import * as indicatorActions from '../actions/indicatorActions';
import { Actions } from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';

function changeDiscoverable(socket, dispatch, discoverable) {    
    socket.emit('/self/changeDiscoverable', discoverable);
}

function onChangeDiscoverable(socket, dispatch) {
    socket.on('/self/changeDiscoverable/success', (bool) => {        
        dispatch(settingsActions.resolveChangeDiscoverable(bool));
    });

    socket.on('/self/changeDiscoverable/fail', (err) => {
        dispatch(indicatorActions.showToast('Could not update. Please try again later'));
    });
}

function logout(socket, dispatch) {    
    socket.emit('/self/logout');
}

function onLogout(socket, dispatch) {
    socket.on('/self/logout/success', () => {        
        AsyncStorage.removeItem('token').then(() => {
            AsyncStorage.removeItem('id').then(() => { 
                dispatch(indicatorActions.showToast(true));   
                Actions.splash({type: 'replace'});
            })
        })                
    });

    socket.on('/self/logout/fail', (err) => {
        dispatch(indicatorActions.showToast('Could not logout. Please try again later'));
    });

    socket.on('/user/loggedOut', (userId) => {
        console.log('user logged out');
    });
}

module.exports = {
    changeDiscoverable,
    onChangeDiscoverable,
    logout,
    onLogout
}