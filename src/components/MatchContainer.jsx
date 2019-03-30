import React from 'react';
import { connect } from 'react-redux';
import '../styles/matchcontainer.css';
import PropTypes from 'prop-types';
import { deleteMatch, userDeleteMatch } from '../actions/matches';

import Match from './Match';


const MatchContainer = ({
  matches, registeredmatches, user, userDelete, adminDelete, toggleAdmin, matchregister,
}) => (
  <div className="matchContainer">
    { (matchregister ? registeredmatches : matches).map(item => (
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
            user.isAdmin ? adminDelete : userDelete
          }
        date={item.date}
        showDelete={toggleAdmin
          || (
            (((new Date()) - new Date(item.date)) < (60 * 60 * 1000))
            && (item.player1._id === user._id
            || item.player2._id === user._id
            || item.registeredby === user._id)
          )
        }
      />
    ))
      }

  </div>
);

MatchContainer.propTypes = {
  matches: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  adminDelete: PropTypes.func.isRequired,
  userDelete: PropTypes.func.isRequired,
  toggleAdmin: PropTypes.bool.isRequired,
  matchregister: PropTypes.bool,
  registeredmatches: PropTypes.array.isRequired,
};

MatchContainer.defaultProps = {
  matchregister: false,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  toggleAdmin: state.auth.toggleAdmin,
  matches: state.matches.matches,
  registeredmatches: state.matchregister.matches,
});

const mapDispatchToProps = dispatch => ({
  adminDelete: id => dispatch(deleteMatch(id)),
  userDelete: id => dispatch(userDeleteMatch(id)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchContainer);
