import {
  POST_USERS_FAILURE,
  POST_USERS_REQUEST,
  POST_USERS_SUCCESS,
} from '../actions/users';

const initialUserState = { users: [], isLoading: false };

function users(state = initialUserState, action) {
  switch (action.type) {
    case POST_USERS_FAILURE:
      return {
        ...state,
        hasErrored: action.hasErrored,
      };
    case POST_USERS_REQUEST:
      return {
        ...state,
        hasErrored: false,
        isLoading: action.isLoading,
      };
    case POST_USERS_SUCCESS:
      return {
        ...state,
        hasErrored: false,
        users: action.users,
      };
    default:
      return state;
  }
}

export default users;
