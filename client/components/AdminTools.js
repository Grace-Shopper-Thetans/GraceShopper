import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/admin.js'

/**
 * COMPONENT
 */
class AdminTools extends React.Component {
  constructor() {
    super()
    this.state = {
      ranOnce: false,
    }
  }

  componentDidMount() {
    this.props.getUsers()
    this.setState({ranOnce: true})
  }

  render() {
    return (
      <div id="adminTools">
        {this.state.ranOnce ? (
          <div>
            {' '}
            {this.props.isAdmin ? (
              <div>
                {this.props.users.map((user) => (
                  <div key={user.id}>
                    <span>
                      <h3>Email:</h3> <h3>{user.email}</h3>
                    </span>
                    <span>
                      <h3>Id:</h3> <h3>{user.id}</h3>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <h1>Admin Permissions Required!</h1>
            )}{' '}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    users: state.admin,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch(fetchAllUsers()),
})

export default connect(mapState, mapDispatch)(AdminTools)
