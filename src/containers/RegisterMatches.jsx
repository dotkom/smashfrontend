import React from 'react';
import { connect } from 'react-redux';
import '../styles/registermatches.css';
import PropTypes from 'prop-types';
import { deleteMatch, userDeleteMatch } from '../actions/matches';
import Match from '../components/Match';
import MatchRegister from '../components/MatchRegister';


class RegisterMatches extends React.Component {
  static propTypes = {
    matches: PropTypes.array.isRequired,
    deleteMatch: PropTypes.func.isRequired,
    userDeleteMatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,

  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="registerMatchesPage">
        <div className="gamerules">
          Regler: Avtal at det er ranked - 8 minutes - 3 stocks - random stage
        </div>
        <MatchRegister />
        <div className="errorMessage">
          {this.props.errorMessage}
        </div>
        <div className="matchContainer">
          { this.props.matches.map(item => (
            <Match
              key={item._id}
              id={item._id}
              oldrank1={item.oldrank1}
              oldrank2={item.oldrank2}
              newrank1={item.newrank1}
              newrank2={item.newrank2}
              player1={item.player1}
              player2={item.player2}
              character1={item.character1}
              character2={item.character2}
              winner={item.winner}
              deleteMatch={
                this.props.user.isAdmin ? this.props.deleteMatch : this.props.userDeleteMatch
              }
              date={item.date}
              showDelete
            />
          ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.matchregister.isLoading,
  errorMessage: state.matchregister.errorMessage,
  user: state.auth.user,
  matches: state.matchregister.matches,
  page: state.matches.page,
  toggleAdmin: state.auth.toggleAdmin,
});

const mapDispatchToProps = dispatch => ({
  deleteMatch: id => dispatch(deleteMatch(id)),
  userDeleteMatch: id => dispatch(userDeleteMatch(id)),


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterMatches);
