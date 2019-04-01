import React from 'react';
import { connect } from 'react-redux';
import '../styles/registermatches.css';
import PropTypes from 'prop-types';
import MatchRegister from '../components/MatchRegister';
import MatchContainer from '../components/MatchContainer';


class RegisterMatches extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,

  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="registerMatchesPage">
        <div className="gamerules">
          Best of 1 - Ruleset: Online Ladder
        </div>
        <MatchRegister />
        <div className="errorMessage">
          {this.props.errorMessage}
        </div>
        <MatchContainer
          matchregister
        />
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
});

const mapDispatchToProps = dispatch => ({


});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterMatches);
