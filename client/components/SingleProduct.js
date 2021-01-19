import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct.js'
import {addItemGuest} from '../store/guestCart.js'
import Cart from './Cart.js'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      ranOnce: false,
    }
    this.numberWithCommas = this.numberWithCommas.bind(this)
    this.addToGCart = this.addToGCart.bind(this)
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

  render() {
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
          <div id="singleProductButton">
            <button
              type="button"
              id="addToCartSingle"
              value={product.id}
              onClick={(e) => this.addToGCart(e)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
})

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  addGCart: (item) => dispatch(addItemGuest(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
