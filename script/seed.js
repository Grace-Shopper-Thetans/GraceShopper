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
      price: 16500,
      quantity: 8,
      description:
        'Authentic Harley-Davidson style through and through, dripping with power. The rubber-mounted 883cc Evolution® engine runs hard and rides smooth for thousands of miles so you can just worry about taking in the freedom of boulevards and back streets.',
      designType: 'Chopper',
      color: 'Black',
      imageUrl:
        'https://i.pinimg.com/originals/fc/e4/4c/fce44cc0e71403d6dc30e718aab22736.png'
    }),
    Product.create({
      name: '$p33d D3mon',
      price: 9000,
      quantity: 17,
      description:
        'Some of the key features of the 2021 250 RR include an adjustable power valve, six-speed gearbox, Brembo hydraulic clutch, nickel-plated pipe, non-spark-arrestor silencer, 2.6-gallon fuel tank, push-button seat removal, full light package with prewired turn signal connections, a skid plate, and an ignition map button for slippery conditions which is mounted just forward of the gas cap. It’s worth noting that while the bike comes standard with electric start, an optional kickstart backup can be purchased as an accessory for approximately $400. Also included with the bike is a complete tool kit and a front number plate in case the owner wishes to remove the headlight and odometer.',
      designType: 'Sport Bike',
      color: 'Orange',
      imageUrl:
        'https://purepng.com/public/uploads/large/purepng.com-motorcyclemotorcyclemotorbikebikecycleracing-bike-1701527510056xqtwf.png'
    }),
    Product.create({
      name: 'Big Boi',
      price: 2200,
      quantity: 11,
      description:
        'The 250 RR is a carbureted, oil-injected two-stroke with an adjustable power valve. 2021 also marks the second year it features a counterbalancer, which greatly reduces engine vibration. That was just one of the many changes it received in its complete makeover for the 2020 model year; other updates included a new frame, swingarm, fuel tank, seat, and bodywork. For 2021, Beta’s 250cc two-stroke enduro bike features a stronger rear subframe, changes to the shim stacks in the fork and shock, new seat foam and seat base, an improved air filter housing, new mounting of the side panel, and a color change to Italian red.',
      designType: 'Chopper',
      color: 'Red',
      imageUrl:
        'https://www.indianmotorcyclelakeville.com/images/indianmotorcyclelakeville-slide-elite.png'
    }),
    Product.create({
      name: `Trouble's Come'n`,
      price: 14000,
      quantity: 21,
      description:
        'In full-throttle situations, the 250 RR makes good power. Engine recovery is up to par, with minimal clutch input needed should you let the rpm drop a little too low. The Italian machine has a very light engine feeling and a smooth transition as the power builds and it really starts to come on the pipe. This might even be an advantage for the less experienced rider or someone who just wants the power to be a little more forgiving.',
      designType: 'Dirt Bike',
      color: 'Orange',
      imageUrl:
        'https://www.pngkey.com/png/full/256-2568579_dirt-bike-png-clipart-library-library-2011-ktm.png',
    }),
    Product.create({
      name: `Big Air`,
      price: 11000,
      quantity: 28,
      description:
        'Beta motorcycles are designed and targeted for the everyday rider. The Italian manufacturer’s RR line of bikes are intended to be more than just a playbike. They focus on “rideability.” Beta takes pride in designing a motorcycle that appeals to the more common, everyday rider.',
      designType: 'Dirt Bike',
      color: 'Red',
      imageUrl:
        'https://powersportsmuskoka.com/wp-content/uploads/2018/03/type-of-dirt-bike-trail.png',
    }),
    Product.create({
      name: `Reach 4 The Sky`,
      price: 32000,
      quantity: 6,
      description:
        'Aprilia’s RSV4 and Tuono have received enough evolutionary changes since their introductions that they’ve remained mostly at the pointy end of performance. But for sportbike fans, enough is never enough, and some were left pining after a redesign of Noale’s iconic V-4s. So for sportbike lovers there’s a sense of occasion (break out the sangiovese!) that accompanies the news that there will be a new RSV4 superbike and Tuono V4 supernaked for 2021.',
      designType: 'Chopper',
      color: 'Blue',
      imageUrl:
        'https://www.pngkit.com/png/full/461-4614357_transparent-motorcycle-chopper-chopper-motorcycle-png.png',
    }),
    Product.create({
      name: `Grandpa-Go`,
      price: 29999,
      quantity: 4,
      description:
        'Let’s start with the RSV4. The big headliner is a larger, Euro 5-approved 1,099cc engine that produces a claimed 217 hp. Mic drop. Other than the displacement boost (up from 1,077cc) and a new exhaust system, Aprilia hasn’t revealed if there are other changes. The press release does call it a “narrow V-4,” implying that Aprilia is expectedly carrying on with its signature 65-degree V configuration. MotoGP fans will know that Aprilia adopted a 90-degree V-angle on the RS-GP 20 this past season, so it will be interesting to see if it eventually goes down that development path in its production models.',
      designType: 'Chopper',
      color: 'Yellow',
      imageUrl:
        'https://i.pinimg.com/originals/5d/90/e4/5d90e44174c08641e78a3266e59c44d4.png',
    }),
    Product.create({
      name: `Spidey`,
      price: 34999,
      quantity: 7,
      description:
        'Even if you don’t want a touring motorcycle, you still may want to take the occasional long trip. With that in mind, Aprilia is offering accessory asymmetrical panniers (no word on if they are hard or soft) for the Tuono V4. Until we test them, we won’t know if the luggage is a ho-hum universal fit item with an Aprilia logo slapped on, or if they’ve been designed for a bespoke fit, but we do appreciate the nod to versatility.',
      designType: 'Chopper',
      color: 'Green',
      imageUrl:
        'https://i.pinimg.com/originals/4b/03/bf/4b03bf4c826fdd4317a2854c1022f906.png',
    }),
    Product.create({
      name: `2 Fast Bro`,
      price: 25000,
      quantity: 14,
      description:
        'The Metacycle is powered by an 8kWh rear hub motor (peaking at 14.5kWh and 4,000Wh lithium-ion battery to deliver a top speed of 80 mph and, according to Sondors, up to 80 miles of range. The battery fully charges in about four hours, according to Sondors.',
      designType: 'Sport Bike',
      color: 'Blue',
      imageUrl:
        'https://i.pinimg.com/originals/e2/25/a3/e225a37c375814791c1b3a3c22269efc.png',
    }),
    Product.create({
      name: `Mr. Evil`,
      price: 28000,
      quantity: 12,
      description:
        'While the Africa Twin is among the most convincing adventure bikes on the market thanks to its light weight and serious off-road ability, there’s no doubt it’s short on power, at least on paper, when compared to its rivals. BMW’s R 1250 GS makes a third more horses than the Honda, with 134 hp, while Ducati’s Multistrada 1260 manages a claimed 158 hp. In 2021, the upcoming Multistrada V4 will raise the bar even further with something north of 170 hp on tap despite using an engine that’s not much larger than the Africa Twin’s.',
      designType: 'Sport Bike',
      color: 'Black',
      imageUrl:
        'https://www.pngkey.com/png/full/366-3669800_yamaha-fz6r-black-sport-motorcycle-bike-png-image.png',
    }),
    Product.create({
      name: `Watch Me`,
      price: 22500,
      quantity: 16,
      description:
        'Honda’s design might be supercharged, but it’s quite different than the Kawasaki H2′s arrangement. For starters, Honda has opted to use a twin-screw supercharger instead of the centrifugal supercharger that Kawasaki employs. That means the Honda design is a “positive displacement” supercharger, which is good for a wider spread of torque from very low revs, while the Kawasaki’s centrifugal supercharger—which works like the compressor section of a turbocharger—is more suited to high-end power and needs more revs before it’s able to provide a significant amount of boost.',
      designType: 'Sport Bike',
      color: 'Yellow',
      imageUrl:
        'https://www.freepnglogos.com/uploads/bike-png/yamaha-sport-motorcycle-bike-png-image-pngpix-1.png',
    }),
    Product.create({
      name: `All Class`,
      price: 19750,
      quantity: 14,
      description:
        'In the supercharger the air is compressed and pushed into an intake duct, before going through two conventional throttle bodies and into the engine. There are two sets of fuel injectors, with one pair mounted in the intakes just ahead of the throttle plates and a second pair squirting fuel directly into the combustion chambers.',
      designType: 'Sport Bike',
      color: 'Silver',
      imageUrl:
        'https://www.pngkey.com/png/full/829-8290558_silver-harley-davidson-motorcycle-bike-png-image-harley.png',
    }),
    Product.create({
      name: `Throttle Master`,
      price: 1100,
      quantity: 37,
      description:
        'Honda’s design incorporates a bypass system to allow air to move between the air cleaner housing and intake passage at low revs or small throttle openings. A computer-controlled butterfly valve opens and closes the bypass as necessary and a pressure-relief valve is also fitted in the intake duct to release any excess boost—say, when the throttle is snapped shut at high revs, directing the overflow back into the air cleaner housing.',
      designType: 'Dirt Bike',
      color: 'Silver',
      imageUrl:
        'https://www.ssrmotorsports.com/store/dirtbike/sr250s/new/w-S.png',
    }),
    Product.create({
      name: `Boogie Man`,
      price: 1450,
      quantity: 31,
      description:
        'The Kawasaki KX250 is a four-stroke motocross bike that takes after its bigger stablemate, the KX450, in chassis, EFI mapping system, hydraulic clutch, and front brake setup for 2021. The smaller KX also sees a multitude of other improvements, making it one of the most revamped models this year. As a well-rounded machine in stock form, the 2021 Kawasaki KX250 offers a nice mix of trickled-down improvements and a higher revving four-stroke 250cc engine. This model ranked fourth among the other 250 four-strokes in Dirt Rider’s 2021 250 Four-Stroke Motocross Bike Comparison Test where it was praised for its neutral-handling chassis, great ergos, competitive top-end power, and smooth clutch pull.',
      designType: 'Dirt Bike',
      color: 'Green',
      imageUrl:
        'https://content2.kawasaki.com/ContentStorage/KMC/ProductTrimGroup/55/8fe5c7a3-6215-4c47-8398-8c0925533ca3.png?w=750',
    }),
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
