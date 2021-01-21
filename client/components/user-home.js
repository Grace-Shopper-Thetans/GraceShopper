import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, name} = props

  function handleClick() {}

  return (
    <div id="home">
      <h1 id="welcomeBack">Welcome Back, {name || email}!</h1>
      <p id="quote">Ready to find the bike of your dreams... again?</p>
      <Link to="/products">
        <button type="button" id="welcomeButton" onClick={handleClick}>
          Enter Store
        </button>
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    name: state.user.name,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
