import {
  POST_USER_FAILURE,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
} from '../actions/users';
const initialUserState = { page: 1, users: [], isLoading: false };

function users(state = initialUserState, action) {
  switch (action.type) {
  case POST_USER_FAILURE:
    return {
      ...state,
      hasErrored: action.hasErrored,
    }
  case POST_USER_REQUEST:
    return {
      ...state,
      hasErrored: false,
      isLoading: action.isLoading,
    }
  case POST_USER_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      users: action.users,
    }
  default:
    return state;
  }
}

export default users;
