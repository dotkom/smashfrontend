import API_ADDRESS from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;

export const POST_LEADERBOARD_REQUEST = 'POST_LEADERBOARD_REQUEST';
export const POST_LEADERBOARD_SUCCESS = 'POST_LEADERBOARD_SUCCESS';
export const POST_LEADERBOARD_FAILURE = 'POST_LEADERBOARD_FAILURE';
export const LEADERBOARD_PAGE_INCREMENT = 'LEADERBOARD_PAGE_INCREMENT';
export const LEADERBOARD_PAGE_RESET = 'LEADERBOARD_PAGE_RESET';

export function postLeaderboardFailure(bool) {
  return {
    type: POST_LEADERBOARD_FAILURE,
    hasErrored: bool,
  };
}
export function postLeaderboardLoading(bool) {
  return {
    type: POST_LEADERBOARD_REQUEST,
    isLoading: bool,
  };
}
export function postLeaderboardSuccess(users, allLoaded) {
  return {
    type: POST_LEADERBOARD_SUCCESS,
    users,
    allLoaded,
  };
}


export function pageIncrement() {
  return {
    type: LEADERBOARD_PAGE_INCREMENT,
  };
}

export function pageReset() {
  return {
    type: LEADERBOARD_PAGE_RESET,
  };
}


export function getLeaderboard(page) {
  return (dispatch) => {
    dispatch(postLeaderboardLoading(true));
    return axios.get(`${API_ADDRESS}/leaderboard/top/${page}`)
      .then((response) => {
        dispatch(postLeaderboardLoading(false));
        return response.data;
      })
      .then((users) => {
        let allLoaded = false;
        if (users.length > 9) {
          dispatch(pageIncrement());
        } else {
          allLoaded = true;
        }
        dispatch(postLeaderboardSuccess(users, allLoaded));
      })
      .catch(() => {
        dispatch(postLeaderboardFailure(true));
      });
  };
}
