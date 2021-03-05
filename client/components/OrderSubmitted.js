import React from 'react'
import {connect} from 'react-redux'
import Cart from './Cart.js'
import {fetchCart} from '../store/cart'
import {getGuestCart} from '../store/guestCart'
import {Link} from 'react-router-dom'

class OrderSubmitted extends React.Component {
  componentDidMount() {
    this.props.getCart()
    this.props.getGCart()
  }

  render() {
    return (
      <div id="orderproductsList">
        {this.props.isLoggedIn
          ? this.props.cart.map((item) => (
              <div className="productContainer" key={item.id}>
                <Link to="/products/:productId">
                  <h2 id="mpName">{item.name}</h2>
                </Link>
                <p id="mpPrice">${item.price}</p>
                <div id="imageContainer">
                  <img id="mpImage" src={item.imageUrl} />
                </div>
                <h3 id="mpDesign">Bike Type: {item.designType}</h3>
                <h3 id="mpColor">Color: {item.color}</h3>
                <div id="singleProductDescription">
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          : this.props.gCart.map((item) => (
              <div className="productContainer" key={item.data.id}>
                <Link to="/products/:productId">
                  <h2 id="mpName">{item.data.name}</h2>
                </Link>
                <p id="mpPrice">${item.data.price}</p>
                <div id="imageContainer">
                  <img id="mpImage" src={item.data.imageUrl} />
                </div>
                <h3 id="mpDesign">Bike Type: {item.data.designType}</h3>
                <h3 id="mpColor">Color: {item.data.color}</h3>
                <div id="singleProductDescription">
                  <p>{item.data.description}</p>
                </div>
              </div>
            ))}
        <Cart />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id,
  gCart: state.gCart,
})

const mapDispatchToProps = (dispatch) => ({
  getGCart: () => dispatch(getGuestCart()),
  getCart: () => dispatch(fetchCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSubmitted)
