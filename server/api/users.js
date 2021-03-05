const router = require('express').Router()
const {User} = require('../db/models')
const Order = require('../db/models/orders')
const OrdersProducts = require('../db/models/orders_products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email'],
      })
      res.json(users)
    } else {
      res.send('Admin privileges required!')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (
      req.user.dataValues.id === Number(req.params.userId) ||
      req.user.dataValues.isAdmin
    ) {
      const user = await User.findOne({
        where: {
          id: req.params.userId,
        },
        include: Order,
      })

      let orderIds = []

      for (let i = 0; i < user.orders.length; i++) {
        if (user.orders[i].status === true) {
          orderIds.push(user.orders[i].id)
        }
      }

      let ordersProducts = await OrdersProducts.findAll({
        where: {
          orderId: orderIds,
        },
      })

      let orders = []

      for (let i = 0; i < orderIds.length; i++) {
        orders.push({})
      }
      ordersProducts.forEach((item) => {
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].id === undefined) {
            orders[i].date = item.createdAt
            orders[i].id = item.orderId
            orders[i].qty = 1
            orders[i].finalPrice = item.finalPrice
          } else if (orders[i].id === item.orderId) {
            orders[i].qty += 1
            orders[i].finalPrice += item.finalPrice
          }
        }
      })

      res.send([user, orders])
    } else res.send('Admin privileges required')
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
    })
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})
