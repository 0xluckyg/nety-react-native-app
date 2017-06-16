import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_USER, SERVER} from '../helper/constants.js'
import {connect} from '../sockets'
import store from '../store'
import * as indicatorActions from './indicatorActions';

export const signUpUser = (userInfo) => {    
    return dispatch => {
        axios.post(`${SERVER}/signup`, userInfo, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => dispatch(resolveAuth(res)))
        .catch(err => {
            store.dispatch(indicatorActions.showToast(true));
             console.log('SIGNUP ERR ',err.response.data);
        });
    }
}

export const signInUser = (userInfo) => {    
    return dispatch => {
        axios.post(`${SERVER}/login`, userInfo, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => dispatch(resolveAuth(res)))
        .catch(err => {
            store.dispatch(indicatorActions.showToast(true));
             console.log('LOGIN ERR ',err.response.data);
        });
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