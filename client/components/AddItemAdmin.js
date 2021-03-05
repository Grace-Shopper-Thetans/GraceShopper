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
        <form onSubmit={this.handleSubmit}>
          <label>New Product</label>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <p>Description:</p>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <p>Image URL:</p>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <p>Type:</p>
          <select
            name="designType"
            value={this.state.designType}
            onChange={this.handleChange}
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
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getAllProducts: () => dispatch(fetchProducts()),
})

export default connect(null, mapDispatch)(NewItemForm)
