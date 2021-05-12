const Record = require('../record')
const db = require('../../config/mongoose')
const records = require('./record.json')

db.once('open', () => {
  records.results.forEach(record => {
    Record.create(record)
  })
  console.log('done!')
})
