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
    console.log('req body', req.body)
    const newAddition = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
      },
    })
    console.log(newAddition[0].dataValues.id)

    const isItemIn = await OrdersProducts.findOne({
      where: {
        productId: Number(req.body.itemId),
      },
    })
    console.log('is item in', isItemIn)
    if (isItemIn) {
      isItemIn.update({qty: isItemIn.dataValues.qty + 1})
      res.send()
    } else {
      await OrdersProducts.create({
        productId: req.body.itemId,
        orderId: newAddition[0].dataValues.id,
      })
      res.send()
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    await OrdersProducts.destroy({
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      }
    })
    res.json('Item has been deleted')
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    await OrdersProducts.destroy({
      where: {orderId: req.params.orderId}
    })

    res.json('User cart deleted')
  } catch (error) {
    next(error)
  }
})

module.exports = router
