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
      'https://www.pngarts.com/files/4/Motorcycle-Transparent-Background-PNG.png'
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
