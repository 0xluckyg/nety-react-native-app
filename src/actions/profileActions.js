import * as keys from '../helper/constants.js'
// import {emitUpdate} from '../huh'
import _ from 'lodash'

export function updateSelf(self) {    
    self = _.omit(self, ['email']);    
    return {         
        type: keys.UPDATE_SELF,
        self
    }    
}

export function resolveUpdateSelf(self) {
    return {
        type: keys.RESOLVE_UPDATE_SELF,
        self
    }
}

export function resolveUpdateUser(user) {
    return {
        type: keys.UPDATE_USER,
        user
    }
}

export function setUser(user) {
    return {
        type: keys.SET_USER,
        user
    }
}