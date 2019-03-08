import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;

export const POST_TEMPUSER_REQUEST = 'POST_TEMPUSER_REQUEST';
export const POST_TEMPUSER_SUCCESS = 'POST_TEMPUSER_SUCCESS';
export const POST_TEMPUSER_FAILURE = 'POST_TEMPUSER_FAILURE';
export const UPDATE_TEMPUSER_SUCCESS = 'UPDATE_TEMPUSER_SUCCESS';

export function postTempUserFailure(string) {
  return {
    type: POST_TEMPUSER_FAILURE,
    errorMessage: string,
  };
}
export function postTempUserLoading(bool) {
  return {
    type: POST_TEMPUSER_REQUEST,
    isLoading: bool,
  };
}
export function postTempUserSuccess(tempusers) {
  return {
    type: POST_TEMPUSER_SUCCESS,
    tempusers,
  };
}
export function updateTempUserSuccess(tempuser) {
  return {
    type: UPDATE_TEMPUSER_SUCCESS,
    tempuser,
  };
}

export function getTempUsers() {
  return (dispatch) => {
    dispatch(postTempUserFailure(true));
    return axios.get(`${API_ADDRESS}/admin/tempusers`)
      .then((response) => {
        dispatch(postTempUserLoading(false));
        return response.data;
      })
      .then((users) => {
        dispatch(postTempUserSuccess(users));
      })
      .catch((err) => {
        dispatch(postTempUserFailure(err.response.data));
      });
  };
}

export function deleteTempUser(id) {
  return (dispatch) => {
    dispatch(postTempUserLoading(true));
    return axios.post(`${API_ADDRESS}/admin/tempuser/delete`, {
      _id: id,
    })
      .then((response) => {
        dispatch(postTempUserLoading(false));
        return response.data;
      })
      .then((user) => {
        dispatch(updateTempUserSuccess(user));
      })
      .catch(() => {
        dispatch(postTempUserFailure(true));
      });
  };
}

export function activateTempUser(id) {
  return (dispatch) => {
    dispatch(postTempUserLoading(true));
    return axios.post(`${API_ADDRESS}/admin/tempuser/activate`, {
      _id: id,
    })
      .then((response) => {
        dispatch(postTempUserLoading(false));
        return response.data;
      })
      .then((user) => {
        dispatch(updateTempUserSuccess(user));
      })
      .catch(() => {
        dispatch(postTempUserFailure(true));
      });
  };
}
