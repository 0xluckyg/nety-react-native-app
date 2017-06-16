import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

import authReducer from './reducers/authReducer';
import networkReducer from './reducers/networkReducer';
import profileReducer from './reducers/profileReducer';
import settingsReducer from './reducers/settingsReducer';
import contactsReducer from './reducers/contactsReducer';
import indicatorReducer from './reducers/indicatorReducer';

const reducers = combineReducers({
      network: networkReducer, 
      profile: profileReducer,
      settings: settingsReducer,
      contacts: contactsReducer,
      indicator: indicatorReducer
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

export default store
