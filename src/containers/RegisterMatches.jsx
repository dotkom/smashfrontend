import React from 'react';
import { connect } from 'react-redux';
import '../styles/registermatches.css';
import PropTypes from 'prop-types';
import { deleteMatch } from '../actions/matches';
import Match from '../components/Match';
import MatchRegister from '../components/MatchRegister';


class RegisterMatches extends React.Component {
  static propTypes = {
    matches: PropTypes.array.isRequired,
    deleteMatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    toggleAdmin: PropTypes.bool.isRequired,

  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="matchesPage">
        <div className="gamerules">
          Regler: Avtal at det er ranked - 8 minutes - 3 stocks - Omega stage
        </div>
        <MatchRegister />
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
              deleteMatch={this.props.deleteMatch}
              date={item.date}
              showAdmin={this.props.toggleAdmin && this.props.user && this.props.user.isAdmin}
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


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterMatches);
