const router = require('express').Router()
const {OrdersProducts, Order} = require('../db/models')

router.get('/:cartId', async (req, res, next) => {
  try {
    const cart = await OrdersProducts.findByPk(req.params.cartId)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const newAddition = await Order.findOrCreate({
      where: {
        userId: req.body.userId
      }
    })
    console.log(newAddition[0].dataValues.id)
    await OrdersProducts.create({
      productId: req.body.itemId,
      orderId: newAddition[0].dataValues.id
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
