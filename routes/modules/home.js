const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const tools = require('../../tools/tools')

const sumAmount = function (records) {
  let sum = 0
  records.forEach(record => {
    sum += record.amount
  })
  return sum
}

function generateIconCode(categoryString) {
  let output = ''
  switch (categoryString) {
    case 'isHome':
      output = 'homeIconCode'
      break
    case 'isTraffic':
      output = 'trafficIconCode'
      break
    case 'isEntertainment':
      output = 'entertainmentIconCode'
      break
    case 'isFood':
      output = 'foodIconCode'
      break
    case 'isOthers':
      output = 'othersIconcode'
      break
  }
  return output
}

router.get('/', (req, res) => {
  const category = req.query.category
  const isNoCategoryQuery = typeof (category) === 'undefined'
  const isSelectAll = category === 'isAll'

  const recordFind = (isNoCategoryQuery || isSelectAll) ? Record.find() : Record.find({ category })

  return recordFind
    .lean()
    .then(records => {
      const totalAmount = sumAmount(records)
      records.forEach(record => {
        record['categoryIconCode'] = generateIconCode(record.category)
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

router.get('/', (req, res) => {
  const category = typeof (req.query.category) === 'undefine' ? '' : req.query.category

  Record.find({ "category": { $regex: `${category}`, $options: '$i' } })
    .lean()
    .then(records => {
      const totalAmount = sumAmount(records)
      records.forEach(record => {
        record['categoryIconCode'] = generateIconCode(record.category)
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})
module.exports = router