import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct.js'
import {addItemGuest} from '../store/guestCart.js'
import {addToCart, fetchCart} from '../store/cart.js'
import Cart from './Cart.js'
import EditItemAdmin from './EditItemAdmin.js'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      ranOnce: false,
    }
    this.addToGCart = this.addToGCart.bind(this)
    this.refresh = this.refresh.bind(this)
    this.addCart = this.addCart.bind(this)
    this.createPrice = this.createPrice.bind(this)
  }

  async componentDidMount() {
    await this.props.getSingleProduct(this.props.match.params.productId)
    this.setState({
      ranOnce: true,
    })
  }

  refresh() {
    this.props.getSingleProduct(this.props.product.id)
  }

  addToGCart(e, qty, stock, id) {
    const idArray = qty.map((product) => product.id)
    if (qty.length && idArray.indexOf(id) !== -1) {
      const item = qty.filter((product) => product.id === id)
      const cartQty = item[0].qty
      if (cartQty === stock) {
        return false
      } else {
        this.props.addGCart(e)
      }
    } else {
      this.props.addGCart(e)
    }
  }

  async addCart(e, qty, stock, id) {
    let cartQty = 1
    if (qty.length) {
      let cartItem = qty
        .filter((cart) => cart.status === false)[0]
        .products.filter((product) => product.id === id)
      if (cartItem.length) {
        cartQty = cartItem[0].orders_products.qty + 1
      }
    }
    if (cartQty > stock) {
      return false
    } else {
      await this.props.addCart(e)
      await this.props.getCart()
    }
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
        Price: {dollars}
        <span style={{fontSize: '12px'}}>{cents}</span>
      </>
    )
  }

  render() {
    const userId = this.props.userId
    const {product} = this.props
    return this.state.ranOnce ? (
      <div id="singleProduct">
        <div id="singleProductInfo">
          <div id="imageAndDescription">
            <img id="singleProductImage" src={product.imageUrl} />
            <div id="singleProductDescription">{product.description}</div>
          </div>
          <h1 id="mpName">{product.name}</h1>
          <h3 id="mpDesign">Bike Type: {product.designType}</h3>
          <h3 id="mpColor">Color: {product.color}</h3>
          <p id="mpPrice">{this.createPrice(product.price)}</p>
          <p id="spQuantity">({product.quantity}) In Stock</p>
          <div id="singleProductButton">
            {this.props.isLoggedIn ? (
              <button
                type="button"
                id="addToCartSingle"
                value={[product.id, userId]}
                onClick={(e) =>
                  this.addCart(e, this.props.cart, product.quantity, product.id)
                }
              >
                Add To Cart
              </button>
            ) : (
              <button
                type="button"
                id="addToCartSingle"
                value={product.id}
                onClick={(e) =>
                  this.addToGCart(
                    e,
                    this.props.gCart,
                    product.quantity,
                    product.id
                  )
                }
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
        {this.props.isAdmin ? (
          <EditItemAdmin state={product.id} refresh={this.refresh} />
        ) : (
          ''
        )}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  isAdmin: state.user.isAdmin,
  isLoggedIn: !!state.user.id,
  userId: state.user.id,
  cart: state.cart,
  gCart: state.gCart,
})

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  addGCart: (item) => dispatch(addItemGuest(item)),
  getCart: (userId) => dispatch(fetchCart(userId)),
  addCart: (itemId, userId) => dispatch(addToCart(itemId, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
