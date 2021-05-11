const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

const sumAmount = function (records) {
  let sum = 0
  records.forEach(record => {
    sum += record.amount
  })
  return sum
}

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      const totalAmount = sumAmount(records)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router