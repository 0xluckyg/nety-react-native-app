import {UPDATE_SELF, UPDATE_USER, RESOLVE_UPDATE_SELF} from '../helper/constants.js'
// import {emitUpdate} from '../huh'
import _ from 'lodash'

export function updateSelf(self) {    
    self = _.omit(self, ['email']);    
    return {         
        type: UPDATE_SELF,
        self
    }    
}

export function resolveUpdateSelf(self) {
    return {
        type: RESOLVE_UPDATE_SELF,
        self
    }
}

export function resolveUpdateUser(user) {
    return {
        type: UPDATE_USER,
        user
    }
}