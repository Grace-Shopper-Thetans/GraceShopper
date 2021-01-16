import React from 'react'
import {connect} from 'react-redux'

import {addToCart, deleteItem, fetchCart} from '../store/cart'
import {getGuestCart, removeItemGuest, clearGuestCart} from '../store/guestCart'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      checkout: false,
      submitted: false,
    }
    this.addToCart = this.addToCart.bind(this)
    this.updateCartGuest = this.updateCartGuest.bind(this)
    this.remove = this.remove.bind(this)
    this.numberWithCommas = this.numberWithCommas.bind(this)
  }

  componentDidMount() {
    // if (this.props.userId) {
    // }
    this.props.getCart(this.props.userId)
    this.props.getGCart()
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

  render() {
    const userId = this.props.userId
    console.log('THIS IS USERID', this.props)
    return (
      <div id="cart">
        {this.props.isLoggedIn ? (
          <div id="cart">
            <h1 id="cartTitle">Cart</h1>
            {this.props.cart.id ? (
              this.props.cart.map((item) => (
                <div key={item.id} id="cartItem">
                  <h3 id="ciName">{item.name}</h3>
                  <img src={item.imageUrl} id="cartImage" />
                  <h4 id="ciPrice">Price: ${item.price}</h4>
                  <button
                    value={[item.id, userId]}
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
        ) : (
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
                <button id="gCheckout" type="button">
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
  userId: state.user.id,
})

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(fetchCart(userId)),
  addCart: (item) => dispatch(addToCart(item)),
  delItem: (item) => dispatch(deleteItem(item)),
  getGCart: () => dispatch(getGuestCart()),
  removeItemGuest: (id) => dispatch(removeItemGuest(id)),
  clearGuestCart: () => dispatch(clearGuestCart()),
})
export default connect(mapState, mapDispatch)(Cart)
