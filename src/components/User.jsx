import React from 'react';
import PropTypes from 'prop-types';
import '../styles/user.css';


const User = ({
  number, rating, nick,
}) => (
  <div className="user">
    <div className="number">
      {' '}
      {number}
      {' '}
    </div>
    <div className="rating">
      {' '}
      {Math.round(rating)}
      {' '}
    </div>
    <div className="nick">
      {' '}
      {nick}
      {' '}
    </div>
    <div />

  </div>
);

User.propTypes = {
  number: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  nick: PropTypes.string.isRequired,
};


export default User;
