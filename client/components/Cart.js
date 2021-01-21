/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {fetchUserOrder} from '../store'

import {
  deleteItem,
  fetchCart,
  clearCart,
  completeUserOrder,
} from '../store/cart'
import {
  getGuestCart,
  removeItemGuest,
  clearGuestCart,
  completeGuestOrder,
} from '../store/guestCart'

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
      guestOrderNumber: -1,
      userOrderNumber: -1,
    }
    this.updateCartGuest = this.updateCartGuest.bind(this)
    this.remove = this.remove.bind(this)
    this.numberWithCommas = this.numberWithCommas.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.clearUserCart = this.clearUserCart.bind(this)
    this.proceed = this.proceed.bind(this)
    this.recede = this.recede.bind(this)
    this.newOrder = this.newOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitUser = this.handleSubmitUser.bind(this)
    this.newUserOrder = this.newUserOrder.bind(this)
    this.userProceed = this.userProceed.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
    this.props.getGCart()
    console.log('running', this.state)
  }

  updateCartGuest() {
    this.props.getGCart()
  }

  remove(id) {
    this.props.removeItemGuest(id)
  }

  removeItem(e) {
    this.props.delItem(e.target.value, this.props.cart[0].id)
    this.props.getCart()
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  clearUserCart() {
    console.log(this.props.cart)
    this.props.clearCart(this.props.cart[0].id)
  }

  proceed() {
    let current = this.state.phase
    let next = current + 1
    this.setState({
      phase: next,
    })
  }

  userProceed() {
    let current = this.state.phase
    let next = current + 1
    this.setState({
      phase: next,
      fullName: this.props.user.name,
      email: this.props.user.email,
      streetAddress: this.props.user.streetAddress,
      city: this.props.user.city,
      state: this.props.user.state,
      zip: this.props.user.zip,
    })
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
      guestOrderNumber: -1,
    })
  }

  newUserOrder() {
    this.props.clearCart()
    this.setState({
      phase: 0,
      fullName: this.props.user.name,
      email: this.props.user.email,
      streetAddress: this.props.user.streetAddress,
      city: this.props.user.city,
      state: this.props.user.state,
      zip: this.props.user.zip,
      ccNumber: '',
      vCode: '',
      exDate: '',
      userOrderNumber: -1,
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log('vCode --->', event.target.vCode.value)
    let orderObj = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      streetAddress: event.target.streetAddress.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zip: event.target.zip.value,
      ccNumber: event.target.ccNumber.value,
      vCode: event.target.vCode.value,
      exDate: event.target.exDate.value,
      items: this.props.gCart,
    }
    console.log(777, orderObj)
    let orderNumber = await completeGuestOrder(orderObj)
    console.log('ORDER #--->', orderNumber.data)
    await this.setState({
      guestOrderNumber: orderNumber.data,
    })
    this.props.clearGuestCart()
    this.proceed()
  }

  async handleSubmitUser(event) {
    event.preventDefault()
    console.log('vCode --->', event.target.vCode.value)
    let orderObj = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      streetAddress: event.target.streetAddress.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zip: event.target.zip.value,
      ccNumber: event.target.ccNumber.value,
      vCode: event.target.vCode.value,
      exDate: event.target.exDate.value,
      items: this.props.cart[0].products,
    }
    console.log(777, orderObj)
    let orderNumber = await completeUserOrder(orderObj)
    console.log('ORDER #--->', orderNumber.data)
    await this.setState({
      userOrderNumber: orderNumber.data,
    })
    this.props.clearCart()
    this.userProceed()
  }

  render() {
    console.log('THIS IS CART[0] --> ', this.props.cart[0])
    let values = Object.values(this.state)
    return (
      <div id="cart">
        {this.props.isLoggedIn ? (
          this.state.phase === 0 ? (
            <div id="cart">
              <h1 id="cartTitle">
                <i className="fas fa-shopping-cart"></i>
              </h1>
              {this.props.cart[0] === undefined ||
              !this.props.cart[0].products.length ? (
                <div id="fullCartDiv">
                  <h2>Empty</h2>
                </div>
              ) : (
                <>
                  <button
                    id="clearCart"
                    type="button"
                    onClick={this.clearUserCart}
                  >
                    Clear Cart
                  </button>
                  {this.props.cart[0].products.map((item) => (
                    <div key={item.id} id="cartItem">
                      <h3 id="ciName">{item.name}</h3>
                      <img src={item.imageUrl} id="cartImage" />
                      <h4 id="ciPrice">Price: ${item.price}</h4>
                      <h3 id="cartQty">Quantity: {item.orders_products.qty}</h3>
                      <button
                        value={item.id}
                        onClick={this.removeItem}
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
                      this.props.cart[0].products.reduce(
                        (a, b) => a + b.price,
                        0
                      )
                    )}
                  </h1>
                  <button
                    id="gCheckout"
                    type="button"
                    onClick={this.userProceed}
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          ) : this.state.phase === 1 ? (
            <div id="cart">
              <h1>Enter Info</h1>
              <p id="guestMessage">
                You are currently checking out as {this.props.user.name}.
              </p>
              <form id="checkoutForm" onSubmit={this.handleSubmitUser}>
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
                  placeholder="Address..."
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
                  <span>{this.props.cart[0].products.length}</span> Items
                </h1>
                <h1 id="checkoutTotal">
                  Total: $
                  {this.numberWithCommas(
                    this.props.cart[0].products.reduce((a, b) => a + b.price, 0)
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
              <h1>Thank You {this.props.user.name}!</h1>
              <h1 id="confMessage">Your Order Number Is:</h1>
              <h1 id="confMessageNum">{this.state.userOrderNumber}</h1>
              <button id="newOrder" type="button" onClick={this.newUserOrder}>
                New Order
              </button>
            </div>
          )
        ) : this.state.phase === 0 ? (
          <div id="cart">
            {this.props.gCart.length ? (
              <div id="fullCartDiv">
                <h1 id="cartTitle">
                  <i className="fas fa-shopping-cart"></i>
                  <span id="small"> ({this.props.gCart.length})</span>
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
                    <h3 id="cartQty">Quantity: {item.qty}</h3>
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
                <h1 id="cartTitle">
                  <i className="fas fa-shopping-cart"></i>
                </h1>
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
            <h1 id="confMessage">
              Thank You {this.state.fullName.split(' ')[0]}!
            </h1>
            <h1 id="confMessage">Your Order Number Is:</h1>
            <h1 id="confMessageNum">{this.state.guestOrderNumber}</h1>
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
  userCart: state.orderProducts,
  userId: state.user.id,
})

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(fetchCart(userId)),
  delItem: (itemId, orderId) => dispatch(deleteItem(itemId, orderId)),
  getGCart: () => dispatch(getGuestCart()),
  removeItemGuest: (id) => dispatch(removeItemGuest(id)),
  clearGuestCart: () => dispatch(clearGuestCart()),
  getUserOrder: (id) => dispatch(fetchUserOrder(id)),
  clearCart: (userId) => dispatch(clearCart(userId)),
})
export default connect(mapState, mapDispatch)(Cart)
