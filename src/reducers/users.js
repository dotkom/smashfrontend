import {
  POST_USERS_FAILURE,
  POST_USERS_REQUEST,
  POST_USERS_SUCCESS,
} from '../actions/users';

const initialUserState = { users: [], isLoading: false, errorMessage: '' };

function users(state = initialUserState, action) {
  switch (action.type) {
    case POST_USERS_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case POST_USERS_REQUEST:
      return {
        ...state,
        errorMessage: '',
        isLoading: action.isLoading,
      };
    case POST_USERS_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        users: action.users,
      };
    default:
      return state;
  }
}

export default users;
