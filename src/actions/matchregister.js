import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.crossdomain = true;

export const POST_MATCHREGISTER_REQUEST = 'POST_MATCHREGISTER_REQUEST';
export const POST_MATCHREGISTER_SUCCESS = 'POST_MATCHREGISTER_SUCCESS';
export const POST_MATCHREGISTER_FAILURE = 'POST_MATCHREGISTER_FAILURE';
export const SET_WINNER = 'SET_WINNER';
export const SET_PLAYER_ONE = 'SET_PLAYER_ONE';
export const SET_PLAYER_TWO = 'SET_PLAYER_TWO';
export const SET_CHARACTER_ONE = 'SET_CHARACTER_ONE';
export const SET_CHARACTER_TWO = 'SET_CHARACTER_TWO';
export const ADD_MATCH_SUCCESS = 'ADD_MATCH_SUCCESS';
export const RESET_MATCHREGISTER = 'RESET_MATCHREGISTER';


export function postMatchregisterFailure(string) {
  return {
    type: POST_MATCHREGISTER_FAILURE,
    errorMessage: string,
  };
}
export function postMatchregisterLoading(bool) {
  return {
    type: POST_MATCHREGISTER_REQUEST,
    isLoading: bool,
  };
}
export function postMatchregisterSuccess(match) {
  return {
    type: POST_MATCHREGISTER_SUCCESS,
    match,
  };
}
export function addMatchSuccess(match) {
  return {
    type: ADD_MATCH_SUCCESS,
    match,
  };
}
export function setWinner(int) {
  return {
    type: SET_WINNER,
    winner: int,
  };
}
export function setPlayer1(string) {
  return {
    type: SET_PLAYER_ONE,
    player1: string,
  };
}
export function setPlayer2(string) {
  return {
    type: SET_PLAYER_TWO,
    player2: string,
  };
}
export function setCharacter1(string) {
  return {
    type: SET_CHARACTER_ONE,
    character1: string,
  };
}
export function setCharacter2(string) {
  return {
    type: SET_CHARACTER_TWO,
    character2: string,
  };
}
export function resetMatchregister() {

}


export function postMatch(player1, player2, character1, character2, winner) {
  return (dispatch) => {
    dispatch(postMatchregisterLoading(true));
    return axios.post(`${API_ADDRESS}/match/new`, {
      player1id: player1,
      player2id: player2,
      character1id: character1,
      character2id: character2,
      winnerid: winner === 1 ? player1 : (winner === 2 ? player2 : null),

    })
      .then((response) => {
        dispatch(postMatchregisterLoading(false));
        return response.data;
      })
      .then((match) => {
        dispatch(postMatchregisterSuccess(match));
      })
      .catch(() => {
        dispatch(postMatchregisterFailure(true));
      });
  };
}
