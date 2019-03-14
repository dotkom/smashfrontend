import API_ADDRESS from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;

export const POST_MATCH_REQUEST = 'POST_MATCH_REQUEST';
export const POST_MATCH_SUCCESS = 'POST_MATCH_SUCCESS';
export const POST_MATCH_FAILURE = 'POST_MATCH_FAILURE';
export const DELETE_MATCH_SUCCESS = 'DELETE_MATCH_SUCCESS';
export const PAGE_INCREMENT = 'PAGE_INCREMENT';
export const PAGE_RESET = 'PAGE_RESET';

export function postMatchFailure(bool) {
  return {
    type: POST_MATCH_FAILURE,
    hasErrored: bool,
  };
}
export function postMatchLoading(bool) {
  return {
    type: POST_MATCH_REQUEST,
    isLoading: bool,
  };
}
export function postMatchSuccess(matches, allLoaded) {
  return {
    type: POST_MATCH_SUCCESS,
    matches,
    allLoaded,
  };
}
export function deleteMatchSuccess(match) {
  return {
    type: DELETE_MATCH_SUCCESS,
    match,
  };
}

export function pageIncrement() {
  return {
    type: PAGE_INCREMENT,
  };
}

export function pageReset() {
  return {
    type: PAGE_RESET,
  };
}

export function getMatches(id, page) {
  return (dispatch) => {
    dispatch(postMatchLoading(true));
    return axios.get(`${API_ADDRESS}/match/user/${id}/page/${page}`)
      .then((response) => {
        dispatch(postMatchLoading(false));
        return response.data;
      })
      .then((matches) => {
        let allLoaded = false;
        if (matches.length > 9) {
          dispatch(pageIncrement());
        } else {
          allLoaded = true;
        }
        dispatch(postMatchSuccess(matches, allLoaded));
      })
      .catch((err) => {
        dispatch(postMatchFailure(err.response ? err.response.data : 'Something went wrong'));
      });
  };
}

export function getAllMatches(page) {
  return (dispatch) => {
    dispatch(postMatchLoading(true));
    return axios.get(`${API_ADDRESS}/match/page/${page}`)
      .then((response) => {
        dispatch(postMatchLoading(false));
        return response.data;
      })
      .then((matches) => {
        let allLoaded = false;
        if (matches.length > 9) {
          dispatch(pageIncrement());
        } else {
          allLoaded = true;
        }
        dispatch(postMatchSuccess(matches, allLoaded));
      })
      .catch((err) => {
        dispatch(postMatchFailure(err.response ? err.response.data : 'Something went wrong'));
      });
  };
}

export function deleteMatch(id) {
  return (dispatch) => {
    dispatch(postMatchLoading(true));
    return axios.post(`${API_ADDRESS}/admin/match/delete`, {
      _id: id,
    })
      .then((response) => {
        dispatch(postMatchLoading(false));
        return response.data;
      })
      .then((match) => {
        dispatch(deleteMatchSuccess(match));
      })
      .catch((err) => {
        dispatch(postMatchFailure(err.response ? err.response.data : 'Something went wrong'));
      });
  };
}
