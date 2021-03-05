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
    const newAddition = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
      },
    })

    const orderId = newAddition[0].dataValues.id

    const item = await Product.findOne({
      where: {
        id: Number(req.body.itemId),
      },
    })

    item.update({quantity: item.dataValues.quantity - 1})

    const isItemIn = await OrdersProducts.findOne({
      where: {
        productId: Number(req.body.itemId),
        orderId: orderId,
      },
    })
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

router.post('/guestorder', async (req, res, next) => {
  try {
    let products = req.body.items.map((item) => Number(item.data.id))
    let totalPrice = req.body.items.reduce((a, b) => a + b.data.price, 0)
    let newOrder = await Order.create({
      status: true,
    })

    const guestUser = await User.findByPk(1)
    guestUser.addOrder(newOrder)

    if (products.length > 1) {
      for (let i = 0; i < products.length; i++) {
        await OrdersProducts.create({
          orderId: newOrder.id,
          finalPrice: totalPrice,
          productId: products[i],
        })
      }
    } else {
      await OrdersProducts.create({
        orderId: newOrder.id,
        finalPrice: totalPrice,
        productId: products,
      })
    }
    res.json(newOrder.id)
  } catch (error) {
    next(error)
  }
})

router.post('/userorder', async (req, res, next) => {
  try {
    let products = req.body.items.map((item) => Number(item.id))
    let totalPrice = req.body.items.reduce((a, b) => a + b.price, 0)
    let newOrder = await Order.create({
      status: true,
      userId: req.user.dataValues.id,
    })
    if (products.length > 1) {
      for (let i = 0; i < products.length; i++) {
        await OrdersProducts.create({
          orderId: newOrder.id,
          finalPrice: totalPrice,
          productId: products[i],
        })
      }
    } else {
      await OrdersProducts.create({
        orderId: newOrder.id,
        finalPrice: totalPrice,
        productId: products,
      })
    }
    res.json(newOrder.id)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    await Order.update({
      where: {
        id: req.params.orderId,
      },
      status: true,
    })
    res.send()
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    const cartItem = await OrdersProducts.findOne({
      where: {productId: req.params.productId, orderId: req.params.orderId},
    })

    const item = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    })

    item.update({quantity: item.dataValues.quantity + cartItem.dataValues.qty})

    await OrdersProducts.destroy({
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId,
      },
    })
    res.json('Item has been deleted')
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const cartItems = await OrdersProducts.findAll({
      where: {orderId: req.params.orderId},
    })

    for (let i = 0; i < cartItems.length; i++) {
      const item = await Product.findOne({
        where: {
          id: cartItems[i].dataValues.productId,
        },
      })

      console.log('ITEM QTY CHECK BEFORE ->', item.dataValues.quantity)

      item.update({
        quantity: item.dataValues.quantity + cartItems[i].dataValues.qty,
      })

      console.log('ITEM QTY CHECK AFTER ->', item.dataValues.quantity)
    }

    await OrdersProducts.destroy({
      where: {orderId: req.params.orderId},
    })

    res.json('User cart deleted')
  } catch (error) {
    next(error)
  }
})

module.exports = router
