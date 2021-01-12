import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products.js'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      ranOnce: false
    }
  }

  componentDidMount() {
    this.props.getAllProducts()
    this.setState({
      ranOnce: true
    })
  }

  render() {
    const products = this.props.products

    return this.state.ranOnce ? (
      <div className="allProducts">
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
                <button type="button">Add To Cart</button>
              </div>
            </div>
          )
        })}
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
