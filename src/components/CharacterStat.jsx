import React from 'react';
import '../styles/characterstat.css';
import PropTypes from 'prop-types';


const CharacterStat = ({ char }) => (
  <div className="characterStat">
    <div className="icon">
      <img alt="char" src={`/icons/characters/${(char.id === '55' || char.id === '56') ? 54 : char.id}.png`} />
    </div>
    <div className="text">
      <div className="name">
        {char.name}
      </div>
      <div className="matches">
        {`games: ${char.count}`}
      </div>
    </div>
    <div className="percentage">
      {`${(char.wins / char.count * 100).toFixed()}%`}
    </div>
  </div>
);

CharacterStat.propTypes = {
};


export default CharacterStat;
