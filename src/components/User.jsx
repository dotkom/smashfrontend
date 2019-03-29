import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/user.css';


const User = ({
  number, rating, nick, id,
}) => (
  <div className="user">
    <div className="number">
      {number}
    </div>
    <div className="rating">
      {Math.round(rating)}
    </div>
    <div className="nick">
      <Link to={`/profile/${id}`}>{nick}</Link>
    </div>
    <div />

  </div>
);

User.propTypes = {
  number: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  nick: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


export default User;
