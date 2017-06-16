import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_USER, SERVER} from '../helper/constants.js'
import {connect} from '../sockets'

export const signUpUser = (userInfo) => {    
    return dispatch => {
        axios.post(`${SERVER}/signup`, userInfo, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => dispatch(resolveAuth(res)))
        .catch(err => {
             console.log(err);
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
             console.log(err);
        });
    }
}

export const resolveAuth = (res) => {        
    console.log('wtf',res.data);
    console.log('wth',res.headers['x-auth']);

    const token = res.headers['x-auth'];

    function saveToken() {
        AsyncStorage.setItem('token', token);
    }

    function persist() {
                
    }

    saveToken();
    persist();  
    connect(token);

    return {
        type: SET_SELF,
        self: res.data
    }
}