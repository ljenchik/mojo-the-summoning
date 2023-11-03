const { db } = require('./config')
const { User, Deck, Card, Attack } = require('../models')

function randInt(a, b) {
  return a + Math.floor(Math.random() * (b - a))
}

async function seed() {
  await db.sync({ force: true })

  const users = await User.bulkCreate([
    { username: 'v1per' },
    { username: 'trinity' },
    { username: 'mr_spoon' }
  ])

  const deckNames = ['snake pit', 'the matrix', 'Doom Burger']
  const decks = await Promise.all(
    users.map((u, i) => u.createDeck({ name: deckNames[i] }))
  )

  const cards = [
    {
      name: 'Arcturus Spellweaver',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'
    },
    {
      name: 'Nimue Mistral',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'
    },
    {
      name: 'Theron Thunderstrike',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/theron-thunderstrike.jpg'
    },
    {
      name: 'Lirien Moonshadow',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/lirien-moonshadow.jpg'
    },
    {
      name: 'Alaric Flamecaller',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/alaric-flamecaller.jpg'
    }
  ]

  const cardPromises = []
  for (let deck of decks) {
    const cardCount = randInt(2, 5)
    for (let i = 0; i < cardCount; i++) {
      const j = randInt(0, cards.length)
      cardPromises.push(deck.createCard(cards[j]))
    }
  }
  await Promise.all(cardPromises)

  console.log('Database seeded')
}

seed()
