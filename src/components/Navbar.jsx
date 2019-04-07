import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, toggleAdmin } from '../actions/auth';
import API_ADDRESS from '../config/connections';
import '../styles/navbar.css';

const Navbar = ({
  user, isLoading, logoutUser, toggleAdminPanels, toggleAdminStatus,
}) => (
  <div className="navbar">
    <div className="links">

      <Link to="/"> Home </Link>
      {user._id
      && <Link to="/registermatch"> New match </Link>
      }
      <Link to="/matches"> Recent matches </Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
    {user._id ? (
      <div className="links">
        {user.isAdmin
          && (
            <>
              <button type="button" className="adminStatusButton" onClick={toggleAdminPanels}>{`admin: ${toggleAdminStatus ? 'on' : 'off'}`}</button>
              <Link to="/admin">Admin</Link>

            </>
          )
      }
        <Link to="/profile">Profile</Link>
        <button type="button" className="button" onClick={logoutUser}><div className="buttontext">Logout</div></button>
      </div>
    ) : (
      <div className="actions">
        <a href={`${API_ADDRESS}/login`}>
          <div className="loginButton">
            <img alt="owlogo" src="/icons/owf-logo.png" />
            <div className="loginText"> Sign in </div>
          </div>
        </a>
      </div>
    )
      }
  </div>
);

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  toggleAdminPanels: PropTypes.func.isRequired,
  toggleAdminStatus: PropTypes.bool.isRequired,

};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  toggleAdminStatus: state.auth.toggleAdmin,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
  toggleAdminPanels: () => dispatch(toggleAdmin()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
