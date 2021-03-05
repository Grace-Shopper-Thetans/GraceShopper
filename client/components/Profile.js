//Need user id to query orders based on that specific user --> link up reducer for updating
//Form for updating account info
//Using the user redux, we can get the user's associated orders
import React from 'react'
import {connect} from 'react-redux'
import {fetchUpdateUser} from '../store/user'
import UserOrders from './UserOrders'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      streetAddress: this.props.user.streetAddress,
      state: this.props.user.state,
      city: this.props.user.city,
      zip: this.props.user.zip,
      id: this.props.user.id,
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const updateUser = this.props.updateUser
    if (this.state.name.length === 0) {
      alert('Username can not be blank!')
    }
    this.setState({submitted: true})
    updateUser({...this.props.user, ...this.state})
  }

  handleUpdate() {
    this.setState({
      submitted: false,
    })
  }

  // eslint-disable-next-line complexity
  render() {
    return (
      <div>
        {this.state.submitted ? (
          <div id="changesSaved">
            <h3>Your changes have been saved!</h3>
            <button
              type="button"
              onClick={() => {
                this.handleUpdate()
              }}
            >
              Make more changes
            </button>
          </div>
        ) : (
          <div id="profile">
            <form
              onSubmit={this.handleSubmit}
              className="login"
              id="updateProfile"
            >
              <h3>Update your account info:</h3>
              <label htmlFor="username">Name:</label>
              <input
                id="checkoutInput"
                type="text"
                name="name"
                value={this.state.name || ''}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email: </label>
              <input
                id="checkoutInput"
                type="text"
                name="email"
                value={this.state.email || ''}
                onChange={this.handleChange}
              />
              <label htmlFor="streetAddress">Street Address:</label>
              <input
                id="checkoutInput"
                type="text"
                name="address"
                value={this.state.streetAddress || ''}
                onChange={this.handleChange}
              />
              <label htmlFor="state">State: </label>
              <input
                id="checkoutInput"
                type="text"
                name="state"
                value={this.state.state || ''}
                onChange={this.handleChange}
              />
              <label htmlFor="city">City: </label>
              <input
                id="checkoutInput"
                type="text"
                name="city"
                value={this.state.city || ''}
                onChange={this.handleChange}
              />
              <label htmlFor="zip">Zip: </label>
              <input
                id="checkoutInput"
                type="text"
                name="zip"
                value={this.state.zip || ''}
                onChange={this.handleChange}
              />
              <button
                id="gCheckout"
                type="submit"
                style={{margin: '15px 0px 0px 0px'}}
              >
                Save Changes
              </button>
            </form>
            <UserOrders />
            {this.state.submitted ? <h1>Submitted</h1> : null}
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(fetchUpdateUser(user)),
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
