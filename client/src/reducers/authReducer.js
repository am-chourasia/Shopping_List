import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL,REGISTER_SUCCESS, AUTH_ERROR, LOGOUT_SUCCESS, USER_LOADED, USER_LOADING } from '../actions/types';

const initState = {
    token:              localStorage.getItem('token'),
    isAuthenticated:    false,
    isLoading:          false,
    user:               null
}

export default function( state = initState, action){
    switch(action.type)
    {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true 
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload 
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,              // contains both user and payload
                isAuthenticated: true,
                isLoading: false,
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token:              null,
                isAuthenticated:    false,
                isLoading:          false,
            };

        default:
            return state;
    }
}