import {
  POST_USER_FAILURE,
  LOGOUT_SUCCESS,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  RESET_USER_ERROR,
  TOGGLE_ADMIN,
} from '../actions/auth';

const initialAuthState = {
  toggleAdmin: false, user: {}, isLoading: false, errorMessage: '',
};


function auth(state = initialAuthState, action) {
  switch (action.type) {
    case POST_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
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
        errorMessage: '',
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        errorMessage: '',
      };
    case RESET_USER_ERROR:
      return {
        ...state,
        errorMessage: '',
      };
    case TOGGLE_ADMIN:
      return {
        ...state,
        toggleAdmin: !state.toggleAdmin,
      };
    default:
      return state;
  }
}

export default auth;
