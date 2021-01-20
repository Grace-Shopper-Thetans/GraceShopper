'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      name: 'Cody Doe',
      streetAddress: '32 Lake Drive',
      state: 'NY',
      city: 'Elmhurst',
      zip: 11375
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      name: 'John Doe',
      streetAddress: '42 Brown St',
      state: 'FL',
      city: 'Miami',
      zip: 24323
    }),
    User.create({
      email: 'admin@email.com',
      password: '123',
      name: 'John Doe',
      streetAddress: '42 Brown St',
      state: 'FL',
      city: 'Miami',
      zip: 24323,
      isAdmin: true
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'DareD3vil',
      price: 17000,
      isSold: false,
      description:
        'Authentic Harley-Davidson style through and through, dripping with power. The rubber-mounted 883cc Evolution® engine runs hard and rides smooth for thousands of miles so you can just worry about taking in the freedom of boulevards and back streets.',
      designType: 'Chopper',
      color: 'Blue',
      imageUrl:
        'https://i.pinimg.com/originals/fc/e4/4c/fce44cc0e71403d6dc30e718aab22736.png'
    }),
    Product.create({
      name: '$p33d D3mon',
      price: 9000,
      isSold: false,
      description:
        'Authentic Harley-Davidson style through and through, dripping with power. The rubber-mounted 883cc Evolution® engine runs hard and rides smooth for thousands of miles so you can just worry about taking in the freedom of boulevards and back streets.',
      designType: 'Sport Bike',
      color: 'Silver',
      imageUrl:
        'https://purepng.com/public/uploads/large/purepng.com-motorcyclemotorcyclemotorbikebikecycleracing-bike-1701527510056xqtwf.png'
    }),
    Product.create({
      name: 'Big Boi',
      price: 2200,
      isSold: false,
      description:
        'Authentic Harley-Davidson style through and through, dripping with power. The rubber-mounted 883cc Evolution® engine runs hard and rides smooth for thousands of miles so you can just worry about taking in the freedom of boulevards and back streets.',
      designType: 'Chopper',
      color: 'Blue',
      imageUrl:
        'https://www.indianmotorcyclelakeville.com/images/indianmotorcyclelakeville-slide-elite.png'
    }),
    Product.create({
      name: `Trouble's Come'n`,
      price: 14000,
      isSold: false,
      description:
        'Authentic Harley-Davidson style through and through, dripping with power. The rubber-mounted 883cc Evolution® engine runs hard and rides smooth for thousands of miles so you can just worry about taking in the freedom of boulevards and back streets.',
      designType: 'Dirt Bike',
      color: 'Silver',
      imageUrl:
        'https://www.pngkey.com/png/full/256-2568579_dirt-bike-png-clipart-library-library-2011-ktm.png'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      status: true
    })
  ])

  const orders2 = await Promise.all([
    Order.create({
      status: true
    })
  ])

  const dummyId = [1, 2, 3]
  const dummyId2 = [1, 2]

  const order = await Order.findOne({
    where: {
      id: 1
    }
  })

  const order2 = await Order.findOne({
    where: {
      id: 2
    }
  })

  const user = await User.findOne({
    where: {
      id: 1
    }
  })

  await order.addProduct(dummyId)
  await order2.addProduct(dummyId2)
  await user.addOrder(1)
  await user.addOrder(2)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
