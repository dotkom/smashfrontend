import {
  POST_MATCH_FAILURE,
  POST_MATCH_REQUEST,
  POST_MATCH_SUCCESS,
  PAGE_INCREMENT,
  DELETE_MATCH_SUCCESS,
  PAGE_RESET,
} from '../actions/matches';
const initialMatchState = { page: 1, matches: [], isLoading: false, allLoaded: false };

function matches(state = initialMatchState, action) {
  switch (action.type) {
  case POST_MATCH_FAILURE:
    return {
      ...state,
      hasErrored: action.hasErrored,
    }
  case POST_MATCH_REQUEST:
    return {
      ...state,
      hasErrored: false,
      isLoading: action.isLoading,
    }
  case POST_MATCH_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      allLoaded: action.allLoaded,
      matches: state.matches.concat(action.matches),
    }
  case DELETE_MATCH_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      matches: state.matches.filter((match) => {
        return match._id !== action.match._id
      })

    }
  case PAGE_INCREMENT:
    return {
      ...state,
      page: state.page+1
    }
  case PAGE_RESET:
    return {
      ...state,
      page: 1,
      matches: [],
      allLoaded: false,
    }
  default:
    return state;
  }
}

export default matches;
