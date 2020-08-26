//This reducer is only to combine all the reducers present to pass as an arfument in the createStore function 

import { combineReducers } from 'redux';
import itemReducer from './itemReducer.js';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';

export default combineReducers({
    item : itemReducer,
    auth : authReducer,
    error: errorReducer
})
