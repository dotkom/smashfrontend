import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/user.css';


const User = ({
  number, rating, nick, id,
}) => (
  <React.Fragment>
    <div className="user usernumber">
      {number}
    </div>
    <div className="user userrating">
      {Math.round(rating)}
    </div>
    <div className="user usernick">
      <Link to={`/profile/${id}`}>{nick}</Link>
    </div>

  </React.Fragment>
);

User.propTypes = {
  number: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  nick: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


export default User;
