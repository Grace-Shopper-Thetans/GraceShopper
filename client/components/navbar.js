import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin, name, email}) => (
  <div id="navbar">
    {isLoggedIn ? (
      <div id="leftNBUser">
        <h1 type="button" id="logoutButton" onClick={handleClick}>
          Logout
        </h1>
        <Link to="/me" id="navItem">
          {name || email}
        </Link>
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
    {isAdmin ? <Link to="/admintools">Admin Tools</Link> : ''}
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    email: state.user.email,
    name: state.user.name,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
