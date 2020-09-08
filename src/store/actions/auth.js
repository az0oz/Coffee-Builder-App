import axios from 'axios'
import * as actionTypes from './actionTypes'
require('dotenv').config()

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path

    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expTime * 1000)
    }
}

export const auth = (email, pass, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            "email": email,
            "password": pass,
            "returnSecureToken": true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_API_KEY;
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_API_KEY;
        }
        axios.post(
            url,
            authData 
        )
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(res.data))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error.message))
        })
        
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const authData = {
                    idToken: token,
                    localId: localStorage.getItem('userId')
                }
                dispatch(authSuccess(authData))
                const transformedDateToSec = (expirationDate.getTime() - Date.now()) / 1000
                dispatch(checkAuthTimeout(transformedDateToSec))
            } else {
                dispatch(logout())
            }

        }
    }
}
