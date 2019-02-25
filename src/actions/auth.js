import { API_ADDRESS } from '../config/connections';
import { push } from 'connected-react-router';

const axios = require('axios');

//axios.defaults.withCredentials = false;

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function postUserFailure(bool) {
  return {
    type: 'POST_USER_FAILURE',
    hasErrored: bool,
  };
}
export function postUserLoading(bool) {
  return {
    type: 'POST_USER_REQUEST',
    isLoading: bool,
    user: null
  };
}
export function postUserSuccess(user) {
  return {
    type: 'POST_USER_SUCCESS',
    user,
  };
}

export function logoutSuccess(bool) {
  return {
    type: 'LOGOUT_SUCCESS',
    user: null,
  };
}


export function postUser(username, password) {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    return axios.post(API_ADDRESS + '/user/login', {
      email: username,
      password: password,
    }
  )
      .then((response) => {
        dispatch(postUserLoading(false));
        return response.data;
      })
      .then((user) => {
        dispatch(postUserSuccess(user));
        //dispatch(push('/'))
      })
      .catch(() => {
        dispatch(postUserFailure(true));
      });
  };
}



export function postCurrent() {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    return axios.get(API_ADDRESS + '/current')
      .then((response) => {
        dispatch(postUserLoading(false));
        return response.data;
      })
      .then((user) => {
        dispatch(postUserSuccess(user));
      })
      .catch(() => {
        dispatch(postUserFailure(true));
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    return axios.get(API_ADDRESS + '/logout')
      .then(() => {
        dispatch(postUserLoading(false));
        dispatch(logoutSuccess());
      })
      .catch(() => {
        dispatch(postUserLoading(false))
        dispatch(postUserFailure(true))
      });
  };
}