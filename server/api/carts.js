const router = require('express').Router()
const {OrdersProducts, Order, User, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  let user = req.user.dataValues.id
  try {
    const order = await Order.findAll({
      where: {
        userId: user
      },
      include: [
        {
          model: Product
        }
      ]
    })

    res.json(order)
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

router.delete('/:itemId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId

    const orderId = await OrdersProducts.findAll({
      where: {
        id: req.user.dataValues.id
      }
    })

    console.log(orderId)

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
