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

router.delete('/:itemId/:userId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId
    const userId = req.params.userId

    const orderId = await Order.findAll({
      where: {
        userId: userId
      }
    }).id

    const deleteId = await OrdersProducts.findByPk(orderId, {
      where: {
        productId: itemId
      }
    })
    !deleteId ? res.sendStatus(404) : await deleteId.destroy()
  } catch (error) {
    next(error)
  }
})

module.exports = router
