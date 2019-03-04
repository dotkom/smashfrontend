import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import '../styles/matches.css';
import { postMatch, setWinner, setPlayer1, setPlayer2, setCharacter1, setCharacter2 } from '../actions/matchregister';
import { getCharacters } from '../actions/characters'
import { getUsers } from '../actions/users'



class MatchRegister extends React.Component {



  componentDidMount() {
    this.props.getCharacters()
    this.props.getUsers()
  }



  render(){
    return(
      <div className="matchRegister">
        <div className="player1" >
          <button className={"button"+ (this.props.winner===1 ? " winner" : "")} onClick={()=>this.props.setWinner(1)}><div className="buttontext">winner</div></button>
        </div>
        <div className="vs"> VS </div>
        <div className="player2" >
          <button className={"button"+ (this.props.winner===2 ? " winner" : "")} onClick={()=>this.props.setWinner(2)}><div className="buttontext">winner</div></button>

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
    setWinner: (int) => dispatch(setWinner(int))


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchRegister)
