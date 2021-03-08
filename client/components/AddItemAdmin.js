import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class NewItemForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      designType: '',
      color: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await axios.put('api/products', this.state)
    this.setState({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      designType: '',
      color: '',
    })
    this.props.getAllProducts()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="updateProfile">
          <label style={{alignSelf: 'center', fontSize: '20px'}}>
            New Product
          </label>
          <hr style={{borderColor: 'black', width: '80%'}} />
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            className="checkoutInput"
          />
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            className="checkoutInput"
          />
          <p>Description:</p>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            className="checkoutInput"
          />
          <p>Image URL:</p>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
            className="checkoutInput"
          />
          <p>Type:</p>
          <select
            name="designType"
            value={this.state.designType}
            onChange={this.handleChange}
            className="checkoutInput"
          >
            <option name="designType" value="Chopper">
              Chopper
            </option>
            <option name="designType" value="Sport Bike">
              Sport Bike
            </option>
            <option name="designType" value="Dirt Bike">
              Dirt Bike
            </option>
          </select>
          <p>Color:</p>
          <input
            type="text"
            name="color"
            value={this.state.color}
            onChange={this.handleChange}
            className="checkoutInput"
          />
          <button type="submit" className="gCheckout">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()),
})

export default connect(null, mapDispatch)(NewItemForm)
