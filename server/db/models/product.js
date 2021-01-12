const Sequelize = require('sequelize')
const db = require('../db.js')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  price: {
    type: Sequelize.INTEGER
  },

  isSold: {
    type: Sequelize.BOOLEAN
  },

  description: {
    type: Sequelize.TEXT
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngarts.com%2Fexplore%2F104918&psig=AOvVaw1qloLRZqNndH1HmEOVtQ3f&ust=1610560740070000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiOsML8lu4CFQAAAAAdAAAAABAD'
  },

  designType: {
    type: Sequelize.ENUM,
    values: ['Chopper', 'Sport Bike', 'Dirt Bike']
  },

  color: {
    type: Sequelize.STRING
  }
})

module.exports = Product
