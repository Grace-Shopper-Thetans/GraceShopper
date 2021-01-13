import React from 'react'
import {connect} from 'react-redux'
import {addToCart, fetchCart} from '../store/cart'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  addToCart(item) {
    this.props.addCart(item)
  }

  render() {
    console.log(this.props)
    return (
      <div id="cart">
        <h1>Cart</h1>
        {this.props.cart.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <img src={item.imageUrl} id="cartImage" />
            <h4>Price: {item.price}</h4>
          </div>
        ))}
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
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  addCart: item => dispatch(addToCart(item))
})
export default connect(mapState, mapDispatch)(Cart)
