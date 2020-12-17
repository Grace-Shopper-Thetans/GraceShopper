import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart.js'
import {addItemGuest} from '../store/guestCart.js'
import {fetchProducts, filterProducts} from '../store/products.js'
import AddItemAdmin from './AddItemAdmin'
import user from '../store/user.js'

import SideNavbar from './Filters'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      ranOnce: false,
      filters: {
        type: 'none',
        color: 'none',
      },
      allProducts: [],
    }
    this.onClick = this.onClick.bind(this)
    this.numberWithCommas = this.numberWithCommas.bind(this)
    this.addToGCart = this.addToGCart.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.toSingleProduct = this.toSingleProduct.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
    this.setState({
      ranOnce: true,
      allProducts: this.props.products,
    })
  }

  async resetFilter() {
    await this.setState({
      filters: {
        type: 'none',
        color: 'none',
      },
    })
    this.props.getAllProducts()
  }

  async onClick(event) {
    const cName = event.target.className
    const filterBy = event.target.innerText
    let filtersObj = {...this.state.filters}
    if (filtersObj[cName] === filterBy) {
      filtersObj[cName] = 'none'
      await this.setState({filters: filtersObj})
    } else {
      filtersObj[cName] = filterBy
      await this.setState({filters: filtersObj})
    }
    if (filtersObj.type === 'none' && filtersObj.color === 'none') {
      this.resetFilter()
    } else {
      this.props.filterProducts(this.state.allProducts, this.state.filters)
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  addToGCart(e) {
    e.persist()
    e.target.parentNode.parentNode.firstChild.firstChild.id = 'mpImageRide'
    function setBack() {
      e.target.parentNode.parentNode.firstChild.firstChild.id = 'mpImage'
    }
    setTimeout(() => this.props.addGCart(e), 1500)
    setTimeout(() => setBack(), 1510)
  }

  toSingleProduct(e) {
    this.props.history.push(`/products/${e.target.className}`)
  }

  render() {
    const products = this.props.products
    const userId = this.props.userId
    console.log('products', products)
    return this.state.ranOnce ? (
      <div id="allProducts">
        <SideNavbar
          click={this.onClick}
          resetFilter={this.resetFilter}
          state={this.state.filters}
        />

        <div id="productsList">
          <AddItemAdmin />
          {products.map((product) => {
            return (
              <div
                className="productContainer"
                key={product.id}
                onClick={this.ride}
              >
                <div className="imageContainer">
                  <img
                    id="mpImage"
                    src={product.imageUrl}
                    className={product.id}
                    onClick={(e) => this.toSingleProduct(e)}
                  />
                </div>

                <div className="productText">
                  <h1
                    id="mpName"
                    className={product.id}
                    onClick={(e) => this.toSingleProduct(e)}
                  >
                    {product.name}
                  </h1>
                  <h3 id="mpDesign">{product.designType}</h3>
                  <h3 id="mpColor">{product.color}</h3>
                  <p id="mpPrice">
                    {'$' + this.numberWithCommas(product.price)}
                  </p>
                </div>
                <div id="allProductsButton">
                  {this.props.isLoggedIn ? (
                    <button
                      type="button"
                      id="addToCart"
                      value={[product.id, userId]}
                      onClick={this.props.addCart}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button
                      type="button"
                      id="addToCart"
                      value={product.id}
                      onClick={(e) => this.addToGCart(e)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  isLoggedIn: !!state.user.id,
  userId: state.user.id,
})

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()),
  filterProducts: (products, filterBy) =>
    dispatch(filterProducts(products, filterBy)),
  addCart: (item) => dispatch(addToCart(item)),
  addGCart: (item) => dispatch(addItemGuest(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
