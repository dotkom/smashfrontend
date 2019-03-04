import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true

export const POST_CHARACTER_REQUEST = 'POST_CHARACTER_REQUEST';
export const POST_CHARACTER_SUCCESS = 'POST_CHARACTER_SUCCESS';
export const POST_CHARACTER_FAILURE = 'POST_CHARACTER_FAILURE';


export function postCharacterFailure(bool) {
  return {
    type: POST_CHARACTER_FAILURE,
    hasErrored: bool
  }
}
export function postCharacterLoading(bool) {
  return {
    type: POST_CHARACTER_REQUEST,
    isLoading: bool,
  }
}
export function postCharacterSuccess(characters) {
  return {
    type: POST_CHARACTER_SUCCESS,
    characters,
  }
}

export function getCharacters() {
  return (dispatch) => {
    dispatch(postCharacterLoading(true))
    return axios.get(API_ADDRESS+'/character/all')
    .then((response) => {
      dispatch(postCharacterLoading(false))
      return response.data
    })
    .then((matches) => {
      dispatch(postCharacterSuccess(matches))
    })
    .catch(() => {
      dispatch(postCharacterFailure(true))
    })
  }
}
