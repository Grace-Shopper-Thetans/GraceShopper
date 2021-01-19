import React from 'react'

export default class NewItemForm extends React.Component {
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

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
    this.setState({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      designType: '',
      color: '',
    })
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
          <select value={this.state.designType} onChange={this.handleChange}>
            <option value="Chopper">Chopper</option>
            <option value="Sport Bike">Sport Bike</option>
            <option value="Dirt Bike">Dirt Bike</option>
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
