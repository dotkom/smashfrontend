import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import '../styles/matchregister.css';
import { postMatch, setWinner, setPlayer1, setPlayer2, setCharacter1, setCharacter2 } from '../actions/matchregister';
import { getCharacters } from '../actions/characters'
import { getUsers } from '../actions/users'
import CharacterPicker from './CharacterPicker'
import UserPicker from './UserPicker'



class MatchRegister extends React.Component {



  componentDidMount() {
    this.props.getCharacters()
    this.props.getUsers()
  }



  render(){
    return(
      <div className="matchRegister">
        <div className="player1" >
          <div className="buttonContainer">
          <button className={"button"+ (this.props.winner===1 ? " winner" : "")} onClick={()=>this.props.setWinner(1)}><div className="buttontext">{(this.props.winner===1 ? " winner" : "loser")}</div></button>

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
        <div className="vs"> <div>VS</div> </div>
        <div className="player2" >
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

            <button className={"button"+ (this.props.winner===2 ? " winner" : "")} onClick={()=>this.props.setWinner(2)}><div className="buttontext">{(this.props.winner===2 ? " winner" : "loser")}</div></button>



          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.matchregister.isLoading,
    users: state.users.users,
    characters: state.characters.characters,
    player1: state.matchregister.player1,
    player2: state.matchregister.player2,
    character1: state.matchregister.character1,
    character2: state.matchregister.character2,
    winner: state.matchregister.winner,
    errorMessage: state.matchregister.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
    getCharacters: () => dispatch(getCharacters()),
    setWinner: (int) => dispatch(setWinner(int)),
    setPlayer1: (nick) => dispatch(setPlayer1(nick)),
    setPlayer2: (nick) => dispatch(setPlayer2(nick)),
    setCharacter1: (id) => dispatch(setCharacter1(id)),
    setCharacter2: (id) => dispatch(setCharacter2(id)),


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchRegister)
