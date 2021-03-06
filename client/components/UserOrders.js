import React from 'react'
import {fetchUserOrder} from '../store/user'
import {connect} from 'react-redux'

class UserOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderProducts: this.props.userOrders}
    this.createPrice = this.createPrice.bind(this)
    this.makeDate = this.makeDate.bind(this)
  }

  async componentDidMount() {
    await this.props.userOrder(this.props.user.id)
  }

  createPrice(price) {
    const strPrice = price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    const dollars = strPrice.slice(0, strPrice.length - 3)
    const cents = strPrice.slice(-3)
    return (
      <>
        {dollars}
        <span style={{fontSize: '12px'}}>{cents}</span>
      </>
    )
  }

  makeDate(ISOdate) {
    const date = new Date(ISOdate)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()

    if (dt < 10) {
      dt = '0' + dt
    }
    if (month < 10) {
      month = '0' + month
    }
    return month + '-' + dt + '-' + year
  }

  render() {
    console.log('this.props.pastOrders --->', this.props.pastOrders)
    if (this.props.pastOrders && this.props.pastOrders.length > 0) {
      const pastOrders = this.props.pastOrders.filter(
        (order) => order.status === true
      )
      if (pastOrders.length) {
        return (
          <div id="userOrders">
            <h3>Past Orders:</h3>
            {pastOrders.map((order) => {
              return (
                <div key={order.id} id="singleOrder">
                  <h3 id="orderNumber">Order # {order.id}</h3>
                  <hr />
                  <h3>Date ......... {this.makeDate(order.createdAt)}</h3>
                  <h3>
                    Total Price .........
                    {this.createPrice(
                      order.products.reduce((a, b) => {
                        return a + b.price * b.orders_products.qty
                      }, 0)
                    )}
                  </h3>
                  <h3>
                    # of Items .........{' '}
                    {order.products.reduce((a, b) => {
                      return a + b.orders_products.qty
                    }, 0)}
                  </h3>
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div id="userOrders">
            <h3>Past Orders:</h3>
            <h3>No Orders have been placed.</h3>
          </div>
        )
      }
    } else {
      return (
        <div id="userOrders">
          <h3>Past Orders:</h3>
          <h3>No Orders have been placed.</h3>
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userOrder: (id) => dispatch(fetchUserOrder(id)),
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userOrders: state.user.orderProducts,
    pastOrders: state.cart,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
