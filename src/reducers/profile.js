import {
  POST_PROFILE_FAILURE,
  POST_PROFILE_REQUEST,
  POST_PROFILE_SUCCESS,
  RESET_PROFILE,
  POST_NICK_SUCCESS
} from '../actions/profile';
const initialProfileState = { user: null, isLoading: false, errorMessage: null };


function profile(state = initialProfileState, action) {
  switch (action.type) {
  case POST_PROFILE_FAILURE:
    return {
      ...state,
      isLoading: action.isLoading,
      errorMessage: action.errorMessage
    };
  case POST_PROFILE_REQUEST:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case POST_PROFILE_SUCCESS:
    return {
      ...state,
      user: action.user,
      errorMessage: null
    };
  case RESET_PROFILE:
    return {
    }
  case POST_NICK_SUCCESS:
    return {
      ...state,
      user: {
        ...state.user,
        nick: action.nick
      }
    }
  default:
    return state;
  }
}

export default profile;
