const router = require('express').Router()
const {OrdersProducts, Order, User, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  let user = null
  if (req.user) {
    user = req.user.dataValues.id
  } else {
    user = 0
  }
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
        status: false,
      },
    })

    const orderId = newAddition[0].dataValues.id

    const isItemIn = await OrdersProducts.findOne({
      where: {
        productId: Number(req.body.itemId),
        orderId: orderId,
      },
    })
    if (isItemIn) {
      isItemIn.update({qty: isItemIn.dataValues.qty + (req.body.incDec || 1)})
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
    console.log(22, req.body.items)
    for (let i = 0; i < req.body.items.length; i++) {
      const id = req.body.items[i].id
      const qtyPurchased = req.body.items[i].qty
      const product = await Product.findByPk(id)
      const newQty = product.quantity - qtyPurchased
      product.update({
        quantity: newQty,
      })
    }
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
    for (let i = 0; i < req.body.items.length; i++) {
      const id = req.body.items[i].id
      const qtyPurchased = req.body.items[i].orders_products.qty
      const product = await Product.findByPk(id)
      const newQty = product.quantity - qtyPurchased
      product.update({
        quantity: newQty,
      })
    }
    let products = req.body.items.map((item) => {
      return {
        id: Number(item.id),
        quantity: item.orders_products.qty,
      }
    })
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
          productId: products[i].id,
          qty: products[i].quantity,
        })
      }
    } else {
      await OrdersProducts.create({
        orderId: newOrder.id,
        finalPrice: totalPrice,
        productId: products[0].id,
        qty: products[0].quantity,
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
    await OrdersProducts.destroy({
      where: {orderId: req.params.orderId},
    })

    res.json('User cart deleted')
  } catch (error) {
    next(error)
  }
})

module.exports = router
