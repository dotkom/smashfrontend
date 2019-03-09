import React from 'react';
import { connect } from 'react-redux';
import '../styles/matchregister.css';
import PropTypes from 'prop-types';
import {
  postMatch, setWinner, setPlayer1, setPlayer2, setCharacter1, setCharacter2,
} from '../actions/matchregister';
import { getCharacters } from '../actions/characters';
import { getUsers } from '../actions/users';
import CharacterPicker from './CharacterPicker';
import UserPicker from './UserPicker';


class MatchRegister extends React.Component {
  static propTypes = {
    getCharacters: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    player1: PropTypes.string.isRequired,
    player2: PropTypes.string.isRequired,
    character1: PropTypes.number.isRequired,
    character2: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    characters: PropTypes.array.isRequired,
    winner: PropTypes.number.isRequired,
    registerMatch: PropTypes.func.isRequired,
    setWinner: PropTypes.func.isRequired,
    setCharacter1: PropTypes.func.isRequired,
    setPlayer1: PropTypes.func.isRequired,
    setCharacter2: PropTypes.func.isRequired,
    setPlayer2: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    this.props.getCharacters();
    this.props.getUsers();
  }

  register() {
    if (this.props.isLoading) {
      return;
    }
    let p1 = this.props.player1;
    let p2 = this.props.player2;
    let c1 = this.props.character1;
    let c2 = this.props.character2;

    this.props.users.forEach((user) => {
      if (user.nick === p1) {
        p1 = user._id;
      }
      if (user.nick === p2) {
        p2 = user._id;
      }
    });
    this.props.characters.forEach((char) => {
      if (char.id === c1) {
        c1 = char._id;
      }
      if (char.id === c2) {
        c2 = char._id;
      }
    });

    const w = this.props.winner;

    this.props.registerMatch(p1, p2, c1, c2, w);
  }


  render() {
    return (
      <div className="matchRegisterContainer">
        <div className="matchRegister">
          <div className="player1">
            <div className="buttonContainer">
              <button type="button" className={`button${this.props.winner === 1 ? ' winner' : ''}`} onClick={() => this.props.setWinner(1)}><div className="buttontext">{(this.props.winner === 1 ? ' winner' : 'loser')}</div></button>

              <CharacterPicker
                setCharacter={this.props.setCharacter1}
                currentCharacter={this.props.character1}
                localitem="character1"
              />
            </div>
            <UserPicker
              setPlayer={this.props.setPlayer1}
              player={this.props.player1}
              placeholder="player 1"
              localitem="player1"
            />
          </div>
          <div className="vs">
            {' '}
            <div>VS</div>
            {' '}
          </div>
          <div className="player2">
            <UserPicker
              setPlayer={this.props.setPlayer2}
              player={this.props.player2}
              placeholder="player 2"
              localitem="player2"
            />
            <div className="buttonContainer reverse">
              <CharacterPicker
                setCharacter={this.props.setCharacter2}
                currentCharacter={this.props.character2}
                localitem="character2"
              />

              <button type="button" className={`button${this.props.winner === 2 ? ' winner' : ''}`} onClick={() => this.props.setWinner(2)}><div className="buttontext">{(this.props.winner === 2 ? ' winner' : 'loser')}</div></button>


            </div>
          </div>
        </div>
        <div className="registerButton">
          <button type="button" onClick={this.register}><div className="buttontext">Register match</div></button>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.matchregister.isLoading,
  users: state.users.users,
  characters: state.characters.characters,
  player1: state.matchregister.player1,
  player2: state.matchregister.player2,
  character1: state.matchregister.character1,
  character2: state.matchregister.character2,
  winner: state.matchregister.winner,
  errorMessage: state.matchregister.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  getCharacters: () => dispatch(getCharacters()),
  setWinner: int => dispatch(setWinner(int)),
  setPlayer1: nick => dispatch(setPlayer1(nick)),
  setPlayer2: nick => dispatch(setPlayer2(nick)),
  setCharacter1: id => dispatch(setCharacter1(id)),
  setCharacter2: id => dispatch(setCharacter2(id)),
  registerMatch: (p1, p2, c1, c2, w) => dispatch(postMatch(p1, p2, c1, c2, w)),


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchRegister);
