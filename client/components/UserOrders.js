import React from 'react'
import {fetchUserOrder} from '../store/user'
import {connect} from 'react-redux'

class UserOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderProducts: [], id: 1}
  }

  async componentDidMount() {
    this.setState({id: this.props.user.id})
    await this.props.userOrder(this.state.id)
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
                <h4>
                  {order.date.slice(0, 9)}...{order.qty} items ... $
                  {order.finalPrice}
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
    user: state.user,
    userOrders: state.user.orderProducts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
