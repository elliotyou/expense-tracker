const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const tools = require('../../tools/tools')
const categories = require('../../config/parameters').categories

//CREATE
router.get('/new', (req, res) => {
  const today = tools.convertToDateString(new Date())
  return res.render('new', { today, categories })
})

router.post('/', (req, res) => {
  const { name, category, amount, merchant } = req.body
  const date = new Date(req.body.date)
  const userId = req.user._id
  return Record.create({ name, date, category, amount, merchant, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//UPDATE
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      // const categoryObject = tools.generateCategoryObject(record.category)
      const category = record.category
      res.render('edit', { record, categories, category })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return Record.findOne({ _id, userId })
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

//DELETE
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return Record.findOne({ id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router