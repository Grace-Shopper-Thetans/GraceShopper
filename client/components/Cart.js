import React from 'react'
import {connect} from 'react-redux'
import {addToCart, deleteItem, fetchCart} from '../store/cart'
import {getGuestCart} from '../store/guestCart'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      guestCart: []
    }
    this.addToCart = this.addToCart.bind(this)
    this.updateGuestCart = this.updateGuestCart.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
    const gCart = getGuestCart()

    this.setState({
      guestCart: gCart
    })
  }

  addToCart(item) {
    this.props.addCart(item)
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <h1>Cart</h1>
            {this.props.cart ? (
              this.props.cart.map(item => (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <img src={item.imageUrl} />
                  <h4>Price: {item.price}</h4>
                  <button
                    value={item.id}
                    //onClick={this.props.delItem}
                    type="button"
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
          <div>
            <h1>Cart</h1>
            {this.state.guestCart ? (
              this.state.guestCart.map(item => (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <img src={item.imageUrl} />
                  <h4>Price: {item.price}</h4>
                  <button
                    value={item.id}
                    onClick={this.props.delItem}
                    type="button"
                  >
                    Remove Item
                  </button>
                </div>
              ))
            ) : (
              <h2>Empty</h2>
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

const mapState = state => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  addCart: item => dispatch(addToCart(item)),
  delItem: item => dispatch(deleteItem(item))
})
export default connect(mapState, mapDispatch)(Cart)
