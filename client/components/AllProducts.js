import React from 'react'
import {connect} from 'react-redux'
import {addToCart, fetchCart} from '../store/cart.js'
import {addItemGuest} from '../store/guestCart.js'
import {fetchProducts, filterProducts} from '../store/products.js'
import AddItemAdmin from './AddItemAdmin'

import SideNavbar from './Filters'
import axios from 'axios'

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
    this.addToGCart = this.addToGCart.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.toSingleProduct = this.toSingleProduct.bind(this)
    this.addCart = this.addCart.bind(this)
    this.doIt = this.doIt.bind(this)
    this.createPrice = this.createPrice.bind(this)
    this.removeItemAdmin = this.removeItemAdmin.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllProducts()
    await this.setState({
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

  addToGCart(e, qty, stock, id) {
    e.persist()
    function setBack() {
      e.target.parentNode.parentNode.firstChild.firstChild.id = 'mpImage'
    }
    const idArray = qty.map((product) => product.id)
    if (qty.length && idArray.indexOf(id) !== -1) {
      const item = qty.filter((product) => product.id === id)
      const cartQty = item[0].qty
      if (cartQty === stock) {
        return false
      } else {
        e.target.parentNode.parentNode.firstChild.firstChild.id = 'mpImageRide'
        setTimeout(() => this.props.addGCart(e), 1500)
        setTimeout(() => setBack(), 1510)
      }
    } else {
      e.target.parentNode.parentNode.firstChild.firstChild.id = 'mpImageRide'
      setTimeout(() => this.props.addGCart(e), 1500)
      setTimeout(() => setBack(), 1510)
    }
    setTimeout(() => this.props.getAllProducts(), 1600)
  }

  toSingleProduct(e) {
    this.props.history.push(`/products/${e.target.className}`)
  }

  async doIt(e) {
    await this.props.addCart(e)
    await this.props.getCart()
  }

  addCart(e, qty, stock, id) {
    e.persist()
    function setBack() {
      e.target.parentNode.parentNode.firstChild.firstChild.id = 'mpImage'
    }
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
      e.target.parentNode.parentNode.firstChild.firstChild.id = 'mpImageRide'
      setTimeout(() => this.doIt(e), 1500)
      setTimeout(() => setBack(), 1510)
    }
    setTimeout(() => this.props.getAllProducts(), 1600)
  }

  async removeItemAdmin(e) {
    await axios.delete(`/api/products/${e.target.value}`)

    this.props.getAllProducts()
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
    const products = this.props.products
    const userId = this.props.userId
    return this.state.ranOnce ? (
      <div id="allProducts">
        <SideNavbar
          click={this.onClick}
          resetFilter={this.resetFilter}
          state={this.state.filters}
        />
        {this.props.products.length ? (
          <div id="productsList">
            {this.props.isAdmin && <AddItemAdmin />}
            {products.map((product) => {
              return (
                <div
                  className="productContainer"
                  key={product.id}
                  onClick={this.ride}
                >
                  {this.props.isAdmin && (
                    <button
                      type="button"
                      value={product.id}
                      onClick={this.removeItemAdmin}
                      className="removeButton"
                      style={{
                        display: 'absolute',
                        margin: '10px 0px 0px 10px',
                      }}
                    >
                      REMOVE ITEM
                    </button>
                  )}
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
                    <p id="mpPrice">{this.createPrice(product.price)}</p>
                    <p id="mpQuantity">({product.quantity}) In Stock</p>
                  </div>
                  <div id="allProductsButton">
                    {this.props.isLoggedIn ? (
                      <button
                        type="button"
                        id="addToCart"
                        value={[product.id, userId]}
                        disabled={product.quantity <= 0}
                        onClick={(e) =>
                          this.addCart(
                            e,
                            this.props.cart,
                            product.quantity,
                            product.id
                          )
                        }
                      >
                        {product.quantity > 0 ? 'Add To Cart' : 'Out Of Stock'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        id="addToCart"
                        value={product.id}
                        disabled={product.quantity <= 0}
                        onClick={(e) =>
                          this.addToGCart(
                            e,
                            this.props.gCart,
                            product.quantity,
                            product.id
                          )
                        }
                      >
                        {product.quantity > 0 ? 'Add To Cart' : 'Out Of Stock'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <h1 id="noMatch">No products match these fields, sorry!</h1>
        )}
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
  isAdmin: state.user.isAdmin,
  cart: state.cart,
  gCart: state.gCart,
})

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()),
  filterProducts: (products, filterBy) =>
    dispatch(filterProducts(products, filterBy)),
  addCart: (itemId, userId) => dispatch(addToCart(itemId, userId)),
  addGCart: (item) => dispatch(addItemGuest(item)),
  getCart: (userId) => dispatch(fetchCart(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
