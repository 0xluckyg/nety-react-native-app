import {UPDATE_SELF, UPDATE_USER} from '../helper/constants.js'
// import {emitUpdate} from '../huh'
import _ from 'lodash'

export function updateSelf(self) {    
    return () => { 
        self = _.omit(self, ['email']);        
        emitUpdate(self);
    }    
}

export function resolveUpdateSelf(self) {
    return {
        type: UPDATE_SELF,
        self
    }
}

export function resolveUpdateUser(user) {
    return {
        type: UPDATE_USER,
        user
    }
}