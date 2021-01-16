const router = require('express').Router()
const {User} = require('../db/models')
const Order = require('../db/models/orders')
const OrdersProducts = require('../db/models/orders_products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: Order
    })

    let orderIds = []

    for (let i = 0; i < user.orders.length; i++) {
      if (user.orders[i].status === true) {
        orderIds.push(user.orders[i].id)
      }
    }

    const ordersProducts = await OrdersProducts.findAll({
      where: {
        orderId: orderIds
      }
    })

    // user.orderProducts = ordersProducts

    res.send(ordersProducts)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})
