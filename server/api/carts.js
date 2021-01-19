const router = require('express').Router()
const {OrdersProducts, Order, User, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  let user = req.user.dataValues.id
  try {
    const order = await Order.findAll({
      where: {
        userId: user,
      },
      include: [
        {
          model: Product,
        },
      ],
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const newAddition = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
      },
    })
    console.log(newAddition[0].dataValues.id)
    await OrdersProducts.create({
      productId: req.body.itemId,
      orderId: newAddition[0].dataValues.id,
    })
    res.send()
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    await OrdersProducts.destroy({
      where: {
        productId: req.params.productId,
        where: {
          orderId: req.params.orderId,
        },
      },
    })
    res.json('Item has been deleted')
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await Order.destroy({where: {userId: req.params.userId}})
    res.json('User cart deleted')
  } catch (error) {
    next(error)
  }
})

module.exports = router
