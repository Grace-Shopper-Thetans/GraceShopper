import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store'

import {addToCart, deleteItem, fetchCart} from '../store/cart'
import {getGuestCart, removeItemGuest, clearGuestCart} from '../store/guestCart'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      phase: 0,
      fullName: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      ccNumber: '',
      vCode: '',
      exDate: '',
    }
    this.addToCart = this.addToCart.bind(this)
    this.updateCartGuest = this.updateCartGuest.bind(this)
    this.remove = this.remove.bind(this)
    this.numberWithCommas = this.numberWithCommas.bind(this)
    this.proceed = this.proceed.bind(this)
    this.recede = this.recede.bind(this)
    this.newOrder = this.newOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // if (this.props.userId) {
    // }
    this.props.getCart()
    this.props.getGCart()
    // this.setState({
    //   id: this.props.user.id
    // })
    // this.props.getUserOrder(this.props.userId)
  }

  addToCart(item) {
    this.props.addCart(item)
  }

  updateCartGuest() {
    this.props.getGCart()
  }

  remove(id) {
    this.props.removeItemGuest(id)
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  proceed() {
    let current = this.state.phase
    let next = current + 1
    this.setState({phase: next})
  }

  recede() {
    let current = this.state.phase
    let previous = current - 1
    this.setState({phase: previous})
  }

  newOrder() {
    this.props.clearGuestCart()
    this.setState({
      phase: 0,
      fullName: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      ccNumber: '',
      vCode: '',
      exDate: '',
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('vCode --->', event.target.vCode.value)
    this.proceed()
    //thunk axios call to send form to db as order
  }

  render() {
    const userId = this.props.userId
    let values = Object.values(this.state)
    return (
      <div id="cart">
        {this.props.isLoggedIn ? (
          <div id="cart">
            <h1 id="cartTitle">Cart</h1>
            {this.props.cart ? (
              this.props.cart[0].products.map((item) => (
                <div key={item.id} id="cartItem">
                  <h3 id="ciName">{item.name}</h3>
                  <img src={item.imageUrl} id="cartImage" />
                  <h4 id="ciPrice">Price: ${item.price}</h4>
                  <button
                    value={item.id}
                    onClick={this.props.delItem}
                    type="button"
                    id="removeFromCart"
                  >
                    Remove Item
                  </button>
                </div>
              ))
            ) : (
              <h2>Empty</h2>
            )}{' '}
          </div>
        ) : this.state.phase === 0 ? (
          <div id="cart">
            {this.props.gCart.length ? (
              <div id="fullCartDiv">
                <h1 id="cartTitle">
                  Cart<span id="small"> ({this.props.gCart.length})</span>
                </h1>
                <button
                  id="clearCart"
                  type="button"
                  onClick={this.props.clearGuestCart}
                >
                  Clear Cart
                </button>
                {this.props.gCart.map((item) => (
                  <div key={item.data.id} id="cartItem">
                    <h3 id="ciName">{item.data.name}</h3>
                    <img src={item.data.imageUrl} id="cartImage" />
                    <h4 id="ciPrice">
                      Price: ${this.numberWithCommas(item.data.price)}
                    </h4>
                    <button
                      value={item.data.id}
                      onClick={() => this.remove(item.data.id)}
                      type="button"
                      id="removeFromCart"
                    >
                      Remove Item
                    </button>
                  </div>
                ))}
                <h1 id="checkoutTotal">
                  Total: $
                  {this.numberWithCommas(
                    this.props.gCart.reduce((a, b) => a + b.data.price, 0)
                  )}
                </h1>
                <button id="gCheckout" type="button" onClick={this.proceed}>
                  Checkout
                </button>
              </div>
            ) : (
              <div id="fullCartDiv">
                <h1 id="cartTitle">Cart</h1>
                <h2>Empty</h2>
              </div>
            )}{' '}
          </div>
        ) : this.state.phase === 1 ? (
          <div id="cart">
            <h1>Enter Info</h1>
            <p id="guestMessage">You are currently checking out as a guest.</p>
            <form id="checkoutForm" onSubmit={this.handleSubmit}>
              <label htmlFor="fullName">Full Name</label>
              <input
                autoFocus
                name="fullName"
                type="text"
                value={this.state.fullName}
                placeholder="Full Name..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                placeholder="Email..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="streetAddress">Street Address</label>
              <input
                name="streetAddress"
                type="text"
                value={this.state.streetAddress}
                placeholder="Street Address..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="city">City</label>
              <input
                name="city"
                type="text"
                value={this.state.city}
                placeholder="City..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="state">State</label>
              <input
                name="state"
                type="text"
                value={this.state.state}
                placeholder="State..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="zip">Zip Code</label>
              <input
                name="zip"
                type="text"
                value={this.state.zip}
                placeholder="Zip..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="ccNumber">Credit Card Number</label>
              <input
                name="ccNumber"
                type="text"
                value={this.state.ccNumber}
                placeholder="Credit Card Number..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="vCode">Verification Code</label>
              <input
                name="vCode"
                type="text"
                value={this.state.vCode}
                placeholder="Verification Code..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <label htmlFor="exDate">Expiration Date</label>
              <input
                name="exDate"
                type="text"
                value={this.state.exDate}
                placeholder="Expiration Date..."
                onChange={this.handleChange}
                id="checkoutInput"
                required
              />
              <h1 id="checkoutItems">
                <span>{this.props.gCart.length}</span> Items
              </h1>
              <h1 id="checkoutTotal">
                Total: $
                {this.numberWithCommas(
                  this.props.gCart.reduce((a, b) => a + b.data.price, 0)
                )}
              </h1>
              <button id="goBack" type="button" onClick={this.recede}>
                Go Back
              </button>
              {values.indexOf('') === -1 ? (
                <button id="finalize" type="submit">
                  Finalize Order
                </button>
              ) : (
                <button id="finalizeDisabled" type="submit" disabled>
                  Finalize Order
                </button>
              )}
            </form>
          </div>
        ) : (
          <div id="cart">
            <h1>Thank You {this.state.fullName.split(' ')[0]}!</h1>
            <button id="newOrder" type="button" onClick={this.newOrder}>
              New Order
            </button>
          </div>
        )}
        {/* <h3>Total: {
            this.state.items.reduce((acc, item) => {
                acc += (item.price*item.quantity);
                return acc;
            })
            }</h3> */}
      </div>
    )
  }
}

const mapState = (state) => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id,
  gCart: state.gCart,
  user: state.user,
  //userCart: state.orderProducts,
  userId: state.user.id,
})

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(fetchCart(userId)),
  //addCart: (item) => dispatch(addToCart(item)),
  delItem: (item) => dispatch(deleteItem(item)),
  getGCart: () => dispatch(getGuestCart()),
  removeItemGuest: (id) => dispatch(removeItemGuest(id)),
  clearGuestCart: () => dispatch(clearGuestCart()),
  getUserOrder: (id) => dispatch(fetchUserOrder(id)),
})
export default connect(mapState, mapDispatch)(Cart)
