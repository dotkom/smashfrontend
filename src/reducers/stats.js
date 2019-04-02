import {
  POST_STATS_FAILURE,
  POST_STATS_REQUEST,
  POST_STATS_SUCCESS,
} from '../actions/stats';

const initialStatsState = {
  stats: [], isLoading: false, errorMessage: '',
};

function stats(state = initialStatsState, action) {
  switch (action.type) {
    case POST_STATS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case POST_STATS_REQUEST:
      return {
        ...state,
        errorMessage: '',
        isLoading: action.isLoading,
      };
    case POST_STATS_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        stats: action.stats,
      };
    default:
      return state;
  }
}

export default stats;
