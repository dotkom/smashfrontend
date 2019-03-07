import { API_ADDRESS } from '../config/connections';
import { push } from 'connected-react-router';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RESET_USER_ERROR = 'RESET_USER_ERROR';

export function postUserFailure(string) {
  return {
    type: 'POST_USER_FAILURE',
    errorMessage: string,
  };
}
export function resetError(){
  return {
    type: 'RESET_USER_ERROR',
  }
}

export function postUserLoading(bool) {
  return {
    type: 'POST_USER_REQUEST',
    isLoading: bool,
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


export function postCurrent() {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    return axios.get(API_ADDRESS + '/user/current')
      .then((response) => {
        return response.data;
      })
      .then((user) => {
        dispatch(postUserSuccess(user));
        dispatch(postUserLoading(false));
      })
      .catch((err) => {
        dispatch(postUserFailure(err.response.data));
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
      .catch((err) => {
        dispatch(postUserFailure(err.response.data))
      });
  };
}
