import React from 'react'
import {fetchUserOrder} from '../store/user'
import {connect} from 'react-redux'

class UserOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderProducts: this.props.userOrders}
  }

  async componentDidMount() {
    await this.props.userOrder(this.props.user.id)
  }

  render() {
    if (this.props.pastOrders && this.props.pastOrders.length > 0) {
      const pastOrders = this.props.pastOrders.filter(
        order => order.status === true
      )
      return (
        <div id="userOrders">
          <h3>Past Orders:</h3>
          {pastOrders.map(order => {
            return (
              <div key={order.id} id="singleOrder">
                <h3 id="orderNumber">Order # {order.id}</h3>
                <hr />
                <h3>Date ......... {order.createdAt.slice(0, 9)}</h3>
                <h3>
                  Total Price ......... $
                  {order.products.reduce((a, b) => a + b.price, 0)}
                </h3>
                <h3># of Items ......... {order.products.length}</h3>
              </div>
            )
          })}
        </div>
      )
    }
    return (
      <div id="userOrders">
        <h3>Past Orders:</h3>
        <h3>No Orders have been placed.</h3>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userOrder: id => dispatch(fetchUserOrder(id))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userOrders: state.user.orderProducts,
    pastOrders: state.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
