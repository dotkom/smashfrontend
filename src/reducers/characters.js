import {
  POST_CHARACTER_FAILURE,
  POST_CHARACTER_REQUEST,
  POST_CHARACTER_SUCCESS,
} from '../actions/characters';

const initialCharacterState = { characters: [], isLoading: false };

function characters(state = initialCharacterState, action) {
  switch (action.type) {
    case POST_CHARACTER_FAILURE:
      return {
        ...state,
        hasErrored: action.hasErrored,
      };
    case POST_CHARACTER_REQUEST:
      return {
        ...state,
        hasErrored: false,
        isLoading: action.isLoading,
      };
    case POST_CHARACTER_SUCCESS:
      return {
        ...state,
        hasErrored: false,
        characters: action.characters,
      };
    default:
      return state;
  }
}

export default characters;
