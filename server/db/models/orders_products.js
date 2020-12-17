const Sequelize = require('sequelize')
const db = require('../db.js')

const OrdersProducts = db.define('orders_products', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  finalPrice: {
    type: Sequelize.FLOAT
  }
})

module.exports = OrdersProducts
