import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true

export const POST_MATCH_REQUEST = 'POST_MATCH_REQUEST';
export const POST_MATCH_SUCCESS = 'POST_MATCH_SUCCESS';
export const POST_MATCH_FAILURE = 'POST_MATCH_FAILURE';
export const PAGE_INCREMENT = 'PAGE_INCREMENT';

export function postMatchFailure(bool) {
  return {
    type: POST_MATCH_FAILURE,
    hasErrored: bool
  }
}
export function postMatchLoading(bool) {
  return {
    type: POST_MATCH_REQUEST,
    isLoading: bool,
  }
}
export function postMatchSuccess(matches) {
  return {
    type: POST_MATCH_SUCCESS,
    matches,
  }
}

export function pageIncrement() {
  return {
    type: PAGE_INCREMENT,
  }
}

export function getMatches(id, page) {
  return (dispatch) => {
    dispatch(postMatchLoading(true))
    return axios.get(API_ADDRESS+'/match/user/'+id+'/page/'+page)
    .then((response) => {
      dispatch(postMatchLoading(false))
      return response.data
    })
    .then((matches) => {
      dispatch(postMatchSuccess(matches))
    })
    .catch(() => {
      dispatch(postMatchFailure(true))
    })
  }
}
