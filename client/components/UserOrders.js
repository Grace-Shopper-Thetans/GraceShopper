import React from 'react'
import {fetchUserOrder} from '../store/user'
import {connect} from 'react-redux'

class UserOrders extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let orders = this.props.userOrder(this.props.user.id).orders
    console.log(orders)
    if (orders !== undefined) {
      orders = orders.filter(order => order.status === true)
      return (
        <div id="orders">
          <h3>Past Orders:</h3>
          {orders.map(order => {
            return (
              <div key={order.id}>
                <h4>
                  {order.createdAt +
                    order.orders_products.qty +
                    order.orders_products.finalPrice}
                </h4>
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
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
