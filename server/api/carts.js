const router = require('express').Router()
const {OrdersProducts, Order, User} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await User.findAll({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Order
        }
      ]
    })
    const orderId = order[0].dataValues.id
    console.log(orderId)

    const cart = await OrdersProducts.findAll({
      where: {
        orderId: orderId
      }
    })

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

    //console.log(orderId)

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
