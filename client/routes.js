import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Navbar,
  LandingPage,
  Profile,
  Cart,
} from './components'
import AllProducts from './components/AllProducts.js'
import SingleProduct from './components/SingleProduct.js'
import OrderSubmitted from './components/OrderSubmitted.js'
import {me} from './store'
import AdminTools from './components/AdminTools'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        {this.props.history.location.pathname !== '/' && <Navbar />}
        {this.props.history.location.pathname !== '/' && <Cart />}
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/products" component={AllProducts} />
          <Route path="/orders" component={OrderSubmitted} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/me" component={Profile} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          {/* <Route component={AllProducts} /> */}
        </Switch>
        {isAdmin ? <Route path="/admintools" component={AdminTools} /> : ''}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
