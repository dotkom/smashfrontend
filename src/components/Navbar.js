import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

const Navbar = ({user, isLoading}) => (
  <div>
    {JSON.stringify(user)}
    {isLoading.toString()}
    <div><Link to="/">Home</Link> <Link to="/hello">Hello</Link> <Link to="/counter">Counter</Link></div>
  </div>
)

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())

})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
