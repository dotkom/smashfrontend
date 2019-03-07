import React from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import '../styles/matches.css';
import { getAllMatches, deleteMatch, pageReset } from '../actions/matches';
import Match from '../components/Match'
import MatchRegister from '../components/MatchRegister'



class RegisterMatches extends React.Component {



  componentDidMount() {
  }



  render(){
    return(
      <div className="matchesPage">
        <MatchRegister />
        <div className="matchContainer">
          { this.props.matches.map((item) =>(
              <Match
                key={item._id}
                id={item._id}
                player1={item.player1}
                player2={item.player2}
                character1={item.character1}
                character2={item.character2}
                winner={item.winner}
                deleteMatch={this.props.deleteMatch}
                date={item.date}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.matchregister.isLoading,
    errorMessage: state.matchregister.errorMessage,
    user: state.auth.user,
    matches: state.matchregister.matches,
    page: state.matches.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMatch: (id) => dispatch(deleteMatch(id)),


  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterMatches)
