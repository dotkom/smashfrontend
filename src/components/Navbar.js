import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { push } from 'connected-react-router';
import '../styles/navbar.css'

const Navbar = ({user, isLoading, logout, gotologin, gotoregister}) => (
  <div className="navbar">
    <div className="links">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
      <div className="actions">
      {user ? (
        <div>
          <Link to="/profile">Profile</Link>
          <button className="button" onClick={logout}><div className="buttontext">Logout</div></button>
        </div>
      ) : (
        <div>
          <button className="button" onClick={gotoregister}><div className="buttontext">Register</div></button>
          <button className="button" onClick={gotologin}><div className="buttontext">Login</div></button>
        </div>
      )
      }
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  gotologin: () => dispatch(push('/login')),
  gotoregister: () => dispatch(push('/register'))

})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
