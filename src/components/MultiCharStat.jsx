import React from 'react';
import '../styles/multicharstat.css';
import PropTypes from 'prop-types';


const MultiCharStat = ({
  size, characters, title, sortFunc, winrate,
}) => (
  <div className="multiStats">
    <div className="title">
      {' '}
      {title}
      {' '}
    </div>
    <div className="characters">
      {characters
        .sort((a, b) => sortFunc(a, b))
        .slice(0, size)
        .map(char => (
          <div className="char" key={char.id}>
            <img alt="char" src={`/icons/characters/${(char.id === '55' || char.id === '56') ? 54 : char.id}.png`} />
            <div className="count">
              { winrate ? (
                `${((char.wins / char.count) * 100).toFixed(2)}%`
              ) : (
                char.count
              )}
            </div>
          </div>
        ))}
    </div>
  </div>
);

MultiCharStat.propTypes = {
  size: PropTypes.number.isRequired,
  characters: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  sortFunc: PropTypes.func.isRequired,
  winrate: PropTypes.bool,
};

MultiCharStat.defaultProps = {
  winrate: false,
};


export default MultiCharStat;
