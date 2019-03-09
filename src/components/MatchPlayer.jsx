import React from 'react';
import '../styles/matchplayer.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const MatchPlayer = ({
  reverse, isWinner, icon, id, nick, oldrank, newrank,
}) => (
  <div className={`${reverse ? 'reverse ' : ''}matchPlayer ${isWinner ? 'winner' : 'loser'}`}>

    <div className="iconContainer">
      <img alt="char" src={`/icons/characters/${icon}.png`} />
    </div>
    <div className="information">
      <div />
      <div className="nick">
        <Link to={`/profile/${id}`}>{nick}</Link>
      </div>
      <div className="rating">
        {`${Math.round(oldrank)}->${Math.round(newrank)}`}
      </div>
      {/* <div className="character">
            {this.props.character}
          </div> */}
    </div>
  </div>
);

MatchPlayer.propTypes = {
  reverse: PropTypes.bool,
  isWinner: PropTypes.bool.isRequired,
  icon: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  nick: PropTypes.string.isRequired,
  oldrank: PropTypes.number.isRequired,
  newrank: PropTypes.number.isRequired,
};

MatchPlayer.defaultProps = {
  reverse: false,
};


export default MatchPlayer;
