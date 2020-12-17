import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart.js'
import {addItemGuest} from '../store/guestCart.js'
import {fetchProducts, filterProducts} from '../store/products.js'
import Cart from './Cart.js'
import SideNavbar from './Filters'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      ranOnce: false
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
    this.setState({
      ranOnce: true
    })
  }

  onClick(event) {
    const filterBy = event.target.innerText
    this.props.filterProducts(filterBy)
  }

  render() {
    const products = this.props.products

    return this.state.ranOnce ? (
      <div className="allProducts">
        <SideNavbar click={this.onClick} />
        {products.map(product => {
          return (
            <div className="productContainer" key={product.id}>
              <div className="imageContainer">
                <img id="image" src={product.imageUrl} />
              </div>
              <div className="productText">
                <h1>{product.name}</h1>
                <h3>{product.designType}</h3>
                <h3>{product.color}</h3>
                <p>{product.price}</p>
              </div>
              <div id="allProductsButton">
                {this.props.isLoggedIn ? (
                  <button
                    type="button"
                    value={product.id}
                    onClick={this.props.addCart}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    type="button"
                    value={product.id}
                    onClick={addItemGuest}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          )
        })}
        <Cart />
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(fetchProducts()),
  filterProducts: filterBy => dispatch(filterProducts(filterBy)),
  addCart: item => dispatch(addToCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
