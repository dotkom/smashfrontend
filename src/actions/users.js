import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;

export const POST_USERS_REQUEST = 'POST_USERS_REQUEST';
export const POST_USERS_SUCCESS = 'POST_USERS_SUCCESS';
export const POST_USERS_FAILURE = 'POST_USERS_FAILURE';


export function postUsersFailure(bool) {
  return {
    type: POST_USERS_FAILURE,
    hasErrored: bool,
  };
}
export function postUsersLoading(bool) {
  return {
    type: POST_USERS_REQUEST,
    isLoading: bool,
  };
}
export function postUsersSuccess(users) {
  return {
    type: POST_USERS_SUCCESS,
    users,
  };
}

export function getUsers() {
  return (dispatch) => {
    dispatch(postUsersLoading(true));
    return axios.get(`${API_ADDRESS}/user/all`)
      .then((response) => {
        dispatch(postUsersLoading(false));
        return response.data;
      })
      .then((matches) => {
        dispatch(postUsersSuccess(matches));
      })
      .catch(() => {
        dispatch(postUsersFailure(true));
      });
  };
}
