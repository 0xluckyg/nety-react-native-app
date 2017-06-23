import { SET_SELF, SET_USER, RESOLVE_UPDATE_SELF } from '../helper/constants.js'
import _ from 'lodash'

const initialState = {
    self: {},
    user: {}
}

function sortExperiences(exp) {
    exp.sort(function(a,b){        
        return new Date(b.end) - new Date(a.end);
    });

    return exp;
}

export default function (state = initialState, action) {        
    switch (action.type) {
        case SET_SELF:
            _.omit(action.self, ['discoverable', 'blocked']);
            action.self.experiences = sortExperiences(action.self.experiences)
            return {
                ...state,
                self: action.self
            }
        case RESOLVE_UPDATE_SELF: 
            action.self.experiences = sortExperiences(action.self.experiences)
            return {
                ...state,
                self: action.self
            }        
        case SET_USER:            
            action.self.experiences = sortExperiences(action.user.experiences)
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}