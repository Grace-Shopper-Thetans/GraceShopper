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
    this.numberWithCommas = this.numberWithCommas.bind(this)
    this.addToGCart = this.addToGCart.bind(this)
    this.refresh = this.refresh.bind(this)
    this.addCart = this.addCart.bind(this)
  }

  async componentDidMount() {
    await this.props.getSingleProduct(this.props.match.params.productId)
    this.setState({
      ranOnce: true,
    })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  refresh() {
    this.props.getSingleProduct(this.props.product.id)
  }

  addToGCart(e) {
    this.props.addGCart(e)
    // e.persist()
    // e.target.parentNode.parentNode.firstChild.firstChild.id =
    //   'singleProductImageRide'
    // function setBack() {
    //   e.target.parentNode.parentNode.firstChild.firstChild.id =
    //     'singleProductImage'
    // }
    // setTimeout(() => this.props.addGCart(e), 1500)
    // setTimeout(() => setBack(), 1510)
  }

  async addCart(e) {
    await this.props.addCart(e)
    await this.props.getCart()
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
          <p id="mpPrice">{'$' + this.numberWithCommas(product.price)}</p>
          <p id="spQuantity">({product.quantity}) In Stock</p>
          <div id="singleProductButton">
            {this.props.isLoggedIn ? (
              <button
                type="button"
                id="addToCartSingle"
                value={[product.id, userId]}
                onClick={this.addCart}
              >
                Add To Cart
              </button>
            ) : (
              <button
                type="button"
                id="addToCartSingle"
                value={product.id}
                onClick={(e) => this.addToGCart(e)}
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
})

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  addGCart: (item) => dispatch(addItemGuest(item)),
  getCart: (userId) => dispatch(fetchCart(userId)),
  addCart: (itemId, userId) => dispatch(addToCart(itemId, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
