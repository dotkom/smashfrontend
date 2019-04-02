import API_ADDRESS from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;

export const POST_STATS_REQUEST = 'POST_STATS_REQUEST';
export const POST_STATS_SUCCESS = 'POST_STATS_SUCCESS';
export const POST_STATS_FAILURE = 'POST_STATS_FAILURE';
export const DELETE_STATS_SUCCESS = 'DELETE_STATS_SUCCESS';

export function postStatsFailure(bool) {
  return {
    type: POST_STATS_FAILURE,
    hasErrored: bool,
  };
}
export function postStatsLoading(bool) {
  return {
    type: POST_STATS_REQUEST,
    isLoading: bool,
  };
}
export function postStatsSuccess(stats) {
  return {
    type: POST_STATS_SUCCESS,
    stats,
  };
}
export function deleteStatsSuccess(stats) {
  return {
    type: DELETE_STATS_SUCCESS,
    stats,
  };
}

export function getPlayerStats(id) {
  return (dispatch) => {
    dispatch(postStatsLoading(true));
    return axios.get(`${API_ADDRESS}/user/id/${id}/stats/character`)
      .then((response) => {
        dispatch(postStatsLoading(false));
        return response.data;
      })
      .then((stats) => {
        dispatch(postStatsSuccess(stats));
      })
      .catch((err) => {
        dispatch(postStatsFailure(err.response ? err.response.data : 'Something went wrong'));
      });
  };
}

export function getAllStats() {
  return (dispatch) => {
    dispatch(postStatsLoading(true));
    return axios.get(`${API_ADDRESS}/character/stats`)
      .then((response) => {
        dispatch(postStatsLoading(false));
        return response.data;
      })
      .then((stats) => {
        dispatch(postStatsSuccess(stats));
      })
      .catch((err) => {
        dispatch(postStatsFailure(err.response ? err.response.data : 'Something went wrong'));
      });
  };
}
