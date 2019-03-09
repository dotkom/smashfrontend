import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;

export const POST_PROFILE_REQUEST = 'POST_PROFILE_REQUEST';
export const POST_PROFILE_SUCCESS = 'POST_PROFILE_SUCCESS';
export const POST_PROFILE_FAILURE = 'POST_PROFILE_FAILURE';
export const RESET_PROFILE = 'RESET_PROFILE';
export const POST_NICK_SUCCESS = 'POST_NICK_SUCCESS';

export function postProfileFailure(string) {
  return {
    type: 'POST_PROFILE_FAILURE',
    errorMessage: string,
  };
}

export function postProfileLoading(bool) {
  return {
    type: 'POST_PROFILE_REQUEST',
    isLoading: bool,
  };
}
export function postProfileSuccess(user) {
  return {
    type: 'POST_PROFILE_SUCCESS',
    user,
  };
}
export function postNickSuccess(nick) {
  return {
    type: 'POST_NICK_SUCCESS',
    nick,
  };
}

export function resetProfile() {
  return {
    type: RESET_PROFILE,
  };
}


export function getUser(id) {
  return (dispatch) => {
    dispatch(postProfileLoading(true));
    return axios.get(`${API_ADDRESS}/user/id/${id}`)
      .then(response => response.data)
      .then((user) => {
        dispatch(postProfileSuccess(user));
        dispatch(postProfileLoading(false));
      })
      .catch((err) => {
        dispatch(postProfileFailure(err.response.data));
      });
  };
}
