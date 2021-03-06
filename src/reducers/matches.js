import {
  POST_MATCH_FAILURE,
  POST_MATCH_REQUEST,
  POST_MATCH_SUCCESS,
  PAGE_INCREMENT,
  DELETE_MATCH_SUCCESS,
  PAGE_RESET,
} from '../actions/matches';

const initialMatchState = {
  page: 1, matches: [], isLoading: false, allLoaded: false, errorMessage: '',
};

function matches(state = initialMatchState, action) {
  switch (action.type) {
    case POST_MATCH_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case POST_MATCH_REQUEST:
      return {
        ...state,
        errorMessage: '',
        isLoading: action.isLoading,
      };
    case POST_MATCH_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        allLoaded: action.allLoaded,
        matches: state.matches.concat(action.matches),
      };
    case DELETE_MATCH_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        matches: state.matches.filter(match => match._id !== action.match._id),

      };
    case PAGE_INCREMENT:
      return {
        ...state,
        page: state.page + 1,
      };
    case PAGE_RESET:
      return {
        ...state,
        page: 1,
        matches: [],
        allLoaded: false,
      };
    default:
      return state;
  }
}

export default matches;
