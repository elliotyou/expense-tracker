const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const db = require('../../config/mongoose')
const records = require('./record.json').results
const User = require('../user')


const SEED_USER = {
  name: 'aaa',
  email: 'aaa@aaa.aaa',
  password: 'aaa'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: records.length },
        (_, i) => Record.create({
          name: records[i].name,
          date: new Date(records[i].date),
          category: records[i].category,
          amount: records[i].amount,
          merchant: records[i].merchant,
          userId
        })
      ))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})
