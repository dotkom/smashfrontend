import {
  POST_LEADERBOARD_FAILURE,
  POST_LEADERBOARD_REQUEST,
  POST_LEADERBOARD_SUCCESS,
  LEADERBOARD_PAGE_INCREMENT,
  LEADERBOARD_PAGE_RESET,
} from '../actions/leaderboard';

const initialLeaderboardState = {
  page: 1, users: [], isLoading: false, allLoaded: false,
};

function leaderboard(state = initialLeaderboardState, action) {
  switch (action.type) {
    case POST_LEADERBOARD_FAILURE:
      return {
        ...state,
        hasErrored: action.hasErrored,
      };
    case POST_LEADERBOARD_REQUEST:
      return {
        ...state,
        hasErrored: false,
        isLoading: action.isLoading,
      };
    case POST_LEADERBOARD_SUCCESS:
      return {
        ...state,
        hasErrored: false,
        allLoaded: action.allLoaded,
        users: state.users.concat(action.users),
      };

    case LEADERBOARD_PAGE_INCREMENT:
      return {
        ...state,
        page: state.page + 1,
      };
    case LEADERBOARD_PAGE_RESET:
      return {
        ...state,
        page: 1,
        users: [],
        allLoaded: false,
      };
    default:
      return state;
  }
}

export default leaderboard;
