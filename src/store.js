import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {AsyncStorage} from 'react-native';

import { combineReducers, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

import networkReducer from './reducers/networkReducer';
import profileReducer from './reducers/profileReducer';
import contactsReducer from './reducers/contactsReducer';
import settingsReducer from './reducers/settingsReducer';
import indicatorReducer from './reducers/indicatorReducer';
import socketReducer from './sockets/socket';

const reducers = combineReducers({      
      network: networkReducer, 
      profile: profileReducer,
      settings: settingsReducer,
      contacts: contactsReducer,
      indicator: indicatorReducer,      
      socket: socketReducer
});

//DEV
// Reactotron
//   .configure()
//   .use(reactotronRedux())
//   .connect()

// const store = Reactotron.createStore(reducers, compose([thunk]));

//PRODUCTION
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

module.exports = {
      store
}
