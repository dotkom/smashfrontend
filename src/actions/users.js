import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';


export function postUserFailure(bool) {
  return {
    type: POST_USER_FAILURE,
    hasErrored: bool
  }
}
export function postUserLoading(bool) {
  return {
    type: POST_USER_REQUEST,
    isLoading: bool,
  }
}
export function postUserSuccess(users) {
  return {
    type: POST_USER_SUCCESS,
    users,
  }
}

export function getUsers() {
  return (dispatch) => {
    dispatch(postUserLoading(true))
    return axios.get(API_ADDRESS+'/user/all')
    .then((response) => {
      dispatch(postUserLoading(false))
      return response.data
    })
    .then((matches) => {
      dispatch(postUserSuccess(matches))
    })
    .catch(() => {
      dispatch(postUserFailure(true))
    })
  }
}
