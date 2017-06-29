import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_SELF, SERVER, CONNECT_SOCKET} from '../helper/constants.js'
import {store} from '../store'
import * as indicatorActions from './indicatorActions';

export const signUpUser = (userInfo) => {    
    store.dispatch(indicatorActions.showSpinner(true));
    return dispatch => {        
        axios.post(`${SERVER}/signup`, userInfo, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => dispatch(resolveAuth(res)))
        .catch(err => {
            console.log('ERR?',err);
            store.dispatch(indicatorActions.showSpinner(false));
            store.dispatch(indicatorActions.showToast(err.response.data));             
        });
    }
}

export const signInUser = (userInfo) => {    
    store.dispatch(indicatorActions.showSpinner(true));
    return dispatch => {
        axios.post(`${SERVER}/login`, userInfo, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => dispatch(resolveAuth(res)))
        .catch(err => {            
            store.dispatch(indicatorActions.showSpinner(false));
            store.dispatch(indicatorActions.showToast(err.response.data));             
        });
    }
}

export const resolveGetByToken = (user) => {    
    console.log(user)
    return {
        type: SET_SELF,
        self: user
    }
}

export const resolveAuth = (res) => {        

    const token = res.headers['x-auth'];    

    return {
        type: CONNECT_SOCKET,
        self: {...res.data, token}
    }
}

export const connectWithToken = (data) => {    
    return {
        type: CONNECT_SOCKET,
        self: {_id: data.id, token: data.token}
    }
}