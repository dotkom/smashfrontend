import {
  POST_USER_FAILURE,
  LOGOUT_SUCCESS,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  REGISTER_SUCCESS
} from '../actions/auth';
const initialAuthState = { user: null, isLoading: false, errorMessage: null };


function auth(state = initialAuthState, action) {
  switch (action.type) {
  case POST_USER_FAILURE:
    return {
      ...state,
      isLoading: action.isLoading,
      errorMessage: action.errorMessage
    };
  case POST_USER_REQUEST:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case POST_USER_SUCCESS:
    return {
      ...state,
      user: action.user,
      errorMessage: null
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      user: action.user,
      errorMessage: null
    };
  case REGISTER_SUCCESS:
    return {}
  default:
    return state;
  }
}

export default auth;
