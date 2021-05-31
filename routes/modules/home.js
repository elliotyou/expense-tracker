const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const tools = require('../../tools/tools')

router.get('/', (req, res) => {
  const category = req.query.category
  const isCategorySelectAll = (typeof (category) === 'undefined') || (category === 'isAll')
  const userId = req.user._id
  const recordFind = isCategorySelectAll ? Record.find({ userId }) : Record.find({ userId, category })
  const categoryObject = tools.generateCategoryObject(category)  //for Handlebars

  return recordFind
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const totalAmount = tools.sumAmount(records)
      tools.generateIconCodes(records)
      res.render('index', { records, totalAmount, categoryObject })
    })
    .catch(err => console.log(err))
})

module.exports = router