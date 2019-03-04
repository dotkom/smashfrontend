import {
  POST_TEMPUSER_FAILURE,
  POST_TEMPUSER_REQUEST,
  POST_TEMPUSER_SUCCESS,
  UPDATE_TEMPUSER_SUCCESS
} from '../actions/admin';
const initialTempUserState = { page: 1, tempusers: [], isLoading: false };

function admin(state = initialTempUserState, action) {
  switch (action.type) {
  case POST_TEMPUSER_FAILURE:
    return {
      ...state,
      errorMessage: action.errorMessage,
    }
  case POST_TEMPUSER_REQUEST:
    return {
      ...state,
      errorMessage: null,
      isLoading: action.isLoading,
    }
  case POST_TEMPUSER_SUCCESS:
    return {
      ...state,
      errorMessage: null,
      tempusers: action.tempusers,
    }
  case UPDATE_TEMPUSER_SUCCESS:
    return {
      ...state,
      errorMessage: null,
      tempusers: state.tempusers.filter((tempuser) => {
        return tempuser._id !== action.tempuser._id
      })

    }
  default:
    return state;
  }
}

export default admin;
