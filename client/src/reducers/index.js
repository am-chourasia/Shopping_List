import { combineReducers } from 'redux';
import itemReducer from './itemReducer.js';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';

export default combineReducers({
    item : itemReducer,
    auth : authReducer,
    error: errorReducer
})
