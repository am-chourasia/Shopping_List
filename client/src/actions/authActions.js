import axios from 'axios';
import {returnErrors} from './errorActions'
import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL,REGISTER_SUCCESS, AUTH_ERROR, LOGOUT_SUCCESS, USER_LOADED, USER_LOADING } from '../actions/types';

//CHECK token and load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING});

    axios.get('api/auth/user' ,tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors( err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//REGISTER USER
export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({name, email, password});

    axios.post('/api/users', body, config)
        .then( res => dispatch({ type: REGISTER_SUCCESS, payload: res.data}))
        .catch(err => {
            dispatch(returnErrors( err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({ type: REGISTER_FAIL});
        })
}

//LOGIN USER
export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({email, password});

    axios.post('/api/auth', body, config)
        .then( res => dispatch({ type: LOGIN_SUCCESS, payload: res.data}))
        .catch(err => {
            dispatch(returnErrors( err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({ type: LOGIN_FAIL});
        })
}

//LOGOUT USER
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//LOGOUT USER
// export const logout = () => {
//     return {
//         type: LOGOUT_SUCCESS
//     }
// }

export const tokenConfig = getState => {
    //Get token from localstorage
    const token = getState().auth.token;
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //If token, add to header
    if(token){
        config.headers['x-auth-token']  = token;
    }
    return config;
}