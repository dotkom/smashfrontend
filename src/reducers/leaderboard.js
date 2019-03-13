import {
  POST_LEADERBOARD_FAILURE,
  POST_LEADERBOARD_REQUEST,
  POST_LEADERBOARD_SUCCESS,
  LEADERBOARD_PAGE_INCREMENT,
  LEADERBOARD_PAGE_RESET,
} from '../actions/leaderboard';

const initialLeaderboardState = {
  page: 1, users: [], isLoading: false, allLoaded: false, errorMessage: '',
};

function leaderboard(state = initialLeaderboardState, action) {
  switch (action.type) {
    case POST_LEADERBOARD_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case POST_LEADERBOARD_REQUEST:
      return {
        ...state,
        errorMessage: '',
        isLoading: action.isLoading,
      };
    case POST_LEADERBOARD_SUCCESS:
      return {
        ...state,
        errorMessage: '',
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
        errorMessage: '',
        page: 1,
        users: [],
        allLoaded: false,
      };
    default:
      return state;
  }
}

export default leaderboard;
