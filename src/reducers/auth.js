import {
  POST_USER_FAILURE,
  LOGOUT_SUCCESS,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  RESET_USER_ERROR,
  TOGGLE_ADMIN
} from '../actions/auth';
const initialAuthState = { toggleAdmin: false, user: null, isLoading: false, errorMessage: null };


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
      user: null,
      errorMessage: null
    };
  case RESET_USER_ERROR:
    return {
      ...state,
      errorMessage: null,
    }
  case TOGGLE_ADMIN:
    return {
      ...state,
      toggleAdmin: !state.toggleAdmin
    }
  default:
    return state;
  }
}

export default auth;
