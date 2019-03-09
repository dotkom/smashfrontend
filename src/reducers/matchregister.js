import {
  POST_MATCHREGISTER_FAILURE,
  POST_MATCHREGISTER_REQUEST,
  POST_MATCHREGISTER_SUCCESS,
  SET_WINNER,
  SET_PLAYER_ONE,
  SET_PLAYER_TWO,
  SET_CHARACTER_ONE,
  SET_CHARACTER_TWO,
  RESET_MATCHREGISTER,
} from '../actions/matchregister';

const initialMatchregisterState = {
  matches: [], character1: null, character2: null, player1: '', player2: '', winner: 1, isLoading: false, errorMessage: null,
};

function matchregister(state = initialMatchregisterState, action) {
  switch (action.type) {
    case POST_MATCHREGISTER_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case POST_MATCHREGISTER_REQUEST:
      return {
        ...state,
        errorMessage: null,
        isLoading: action.isLoading,
      };
    case POST_MATCHREGISTER_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        matches: state.matches.concat(action.match),
      };
    case RESET_MATCHREGISTER:
      return {
        ...state,
        matches: [],
      };
    case SET_PLAYER_ONE:
      return {
        ...state,
        player1: action.player1,
      };
    case SET_PLAYER_TWO:
      return {
        ...state,
        player2: action.player2,
      };
    case SET_CHARACTER_ONE:
      return {
        ...state,
        character1: action.character1,
      };
    case SET_CHARACTER_TWO:
      return {
        ...state,
        character2: action.character2,
      };
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    default:
      return state;
  }
}

export default matchregister;
