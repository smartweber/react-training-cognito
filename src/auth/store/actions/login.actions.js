import axios from 'axios/index'
import { setUserData } from 'auth/store/actions/user.actions'
import * as Actions from 'store/actions'
import { signIn } from '../../cognito/organizationApi'

export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export function submitLogin({ username, password }) {
  return (dispatch, getState) => {
    signIn(username, password)
      .then(res => {
        dispatch(
          setUserData({
            role: 'member',
            data: {
              token: res.token,
              displayName: username,
              photoURL: 'assets/images/avatars/profile.jpg',
              email: username
            }
          })
        )
        dispatch({
          type: LOGIN_SUCCESS
        })
      })
      .catch(err => {
        const payload =
          err.message === 'User does not exist.'
            ? {
                username: err.message,
                password: null
              }
            : {
                username: null,
                password: err.message
              }

        return dispatch({
          type: LOGIN_ERROR,
          payload
        })
      })
  }
}
