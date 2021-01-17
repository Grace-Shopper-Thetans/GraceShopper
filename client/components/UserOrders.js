import React from 'react'
import {fetchUserOrder} from '../store/user'
import {connect} from 'react-redux'

class UserOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderProducts: []}
  }

  async componentDidMount() {
    await this.props.userOrder(this.props.user.id)
    this.setState({orderProducts: this.props.userOrders})
  }

  render() {
    if (this.state.orderProducts && this.state.orderProducts.length > 0) {
      return (
        <div id="orders">
          <h3>Past Orders:</h3>
          {this.state.orderProducts.map(order => {
            return (
              <div key={order.id}>
                <h4>Order Date: {order.date.slice(0, 9)}</h4>
                <h4>{order.qty} items</h4>
                <h4>${order.finalPrice}</h4>
              </div>
            )
          })}
        </div>
      )
    }
    return (
      <div id="orders">
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
    userOrders: state.user.orderProducts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
