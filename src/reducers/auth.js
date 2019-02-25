import {
  POST_USER_FAILURE,
  LOGOUT_SUCCESS,
  POST_USER_REQUEST,
  POST_USER_SUCCESS
} from '../actions/auth';
const initialAuthState = { user: null, isLoading: false };


function auth(state = initialAuthState, action) {
  switch (action.type) {
  case POST_USER_FAILURE:
    return {
      ...state,
      hasErrored: action.hasErrored,
    };
  case POST_USER_REQUEST:
    return {
      ...state,
      hasErrored: false,
      isLoading: action.isLoading,
    };
  case POST_USER_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      user: action.user,
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      user: action.user,
    };
  default:
    return state;
  }
}

export default auth;
