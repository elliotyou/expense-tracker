const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const tools = require('../../tools/tools')
const categories = require('../../config/parameters').categories
const months = require('../../config/parameters').months

router.get('/', (req, res) => {
  const category = req.query.category
  let monthIndex = req.query.monthIndex
  const isCategorySelectAll = (category === undefined) || (category === 'isAll')
  const isMonthSelectAll = (monthIndex === undefined) || (monthIndex === 'isAll')
  const userId = req.user._id

  return Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      if (!isCategorySelectAll) {
        records = records.filter(record => record.category === category)
      }
      if (!isMonthSelectAll) {
        records = records.filter(record => {
          return Number(record.date.getMonth()) === Number(monthIndex)
        })
      }
      return records
    })
    .then(records => {
      const totalAmount = tools.sumAmount(records)
      tools.generateIconCodes(records)
      monthIndex = Number(monthIndex)
      res.render('index', { records, totalAmount, categories, category, months, monthIndex })
    })
    .catch(err => console.log(err))
})

module.exports = router