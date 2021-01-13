import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    {isLoggedIn ? (
      <div>
        <button type="button" id="logoutButton" onClick={handleClick}>
          Logout
        </button>
        <h3>Welcome back!</h3>
      </div>
    ) : (
      <div id="leftNB">
        <Link to="/login" id="navItem">
          Login
        </Link>
        <Link to="/signup" id="navItem">
          Sign Up
        </Link>
      </div>
    )}
    <Link to="/products">
      <img src="logo.png" id="logo" />
    </Link>
    <Link to="/" id="GC">
      Grace Chopper
    </Link>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
