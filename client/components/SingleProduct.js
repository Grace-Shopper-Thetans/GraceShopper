import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct.js'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      ranOnce: false
    }
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
    this.setState({
      ranOnce: true
    })
  }

  render() {
    const {product} = this.props
    console.log(product)
    return this.state.ranOnce ? (
      <div className="singleProduct">
        <div id="singleProductInfo">
          <h1>{product.name}</h1>
          <p>{product.price}</p>
          <img id="singleProductImage" src={product.imageUrl} />
          <h3>Bike Type: {product.designType}</h3>
          <h3>Color: {product.color}</h3>
          <div id="singleProductButton">
            <button type="button">Add To Cart</button>
          </div>
        </div>
        <div id="singleProductDescription">{product.description}</div>
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
