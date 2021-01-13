const Sequelize = require('sequelize')
const db = require('../db.js')

const OrdersProducts = db.define('orders_products', {
  qty: {
    type: Sequelize.INTEGER
  },
  finalPrice: {
    type: Sequelize.FLOAT
  }
})

module.exports = OrdersProducts
