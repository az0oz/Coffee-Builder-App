import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    it('It should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('It should store the token upon logging in', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'the token',
            userId: 'the user id'
        }))
        .toEqual({
            token: 'the token',
            userId: 'the user id',
            error: null,
            loading: false,
            authRedirectPath: '/'
            }
        )
    })

    it('It should store the token upon logging in', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'the token',
            userId: 'the user id'
        }))
        .toEqual({
            token: 'the token',
            userId: 'the user id',
            error: null,
            loading: false,
            authRedirectPath: '/'
            }
        )
    })
})

