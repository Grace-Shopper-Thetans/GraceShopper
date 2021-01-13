'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

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
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'DareD3vil',
      price: 17000,
      isSold: false,
      description: 'meh',
      designType: 'Chopper',
      color: 'Blue'
    }),
    Product.create({
      name: '$p33d D3mon',
      price: 9000,
      isSold: false,
      description: 'meh',
      designType: 'Sport Bike',
      color: 'Silver'
    })
  ])

  //Association Assignments Below

  //   const dummyId = [1, 2, 3]

  //   const product = await Product.findOne({
  //     where: {
  //       id: 1
  //     }
  //   })

  //   await product.addUser(dummyId[0])

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
