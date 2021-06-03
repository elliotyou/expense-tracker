const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
// const tools = require('../../tools/tools')

router.get('/', async (req, res) => {
  const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  const category = req.query.category
  const isCategorySelectAll = (category === undefined) || (category === 'isAll')
  const userId = req.user._id

  // const categoryObject = tools.generateCategoryObject(category)  //for Handlebars
  const recordFind = await isCategorySelectAll ? Record.find({ userId }) : Record.find({ userId, category })

  return recordFind
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const totalAmount = tools.sumAmount(records)
      tools.generateIconCodes(records)
      res.render('index', { records, totalAmount, categories, category })
      // res.render('index', { records, totalAmount, categoryObject })
    })
    .catch(err => console.log(err))
})

module.exports = router