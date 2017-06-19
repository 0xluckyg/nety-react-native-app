import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_SELF, SERVER} from '../helper/constants.js'
import {connect} from '../sockets'
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
            store.dispatch(indicatorActions.showToast(err.response.data));             
        });
    }
}

export const resolveGetByToken = (user) => {
    
    function persist() {

    }

    persist();

    return {
        type: SET_SELF,
        self: user
    }
}

export const resolveAuth = (res) => {        

    const token = res.headers['x-auth'];

    function saveToken() {
        connect(token);        
    }

    function persist() {
                
    }

    saveToken();
    persist();      

    return {
        type: SET_SELF,
        self: res.data
    }
}