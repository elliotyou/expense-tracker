const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const { validator } = require('../../middleware/validator')
const tools = require('../../tools/tools')
const categories = require('../../config/parameters').categories

//CREATE
router.get('/new', (req, res) => {
  const record = {
    date: tools.convertToDateString(new Date())
  }
  return res.render('new', { record, categories })
})

router.post('/', validator, (req, res) => {
  const { errors, record } = res.locals

  if (errors.length > 0) {
    return res.render('new', { errors, record, categories })
  }

  const userId = req.user._id
  const { name, category, amount, merchant } = req.body
  const date = new Date(req.body.date)

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
    .then(record => {
      // const categoryObject = tools.generateCategoryObject(record.category)
      const category = record.category
      res.render('edit', { record, categories, category })
    })
    .catch(err => console.log(err))
})

router.put('/:id', validator, (req, res) => {
  // console.log('into routes/modules/records...req.locals', res.locals)
  const { errors, record } = res.locals
  const _id = req.params.id
  const userId = req.user._id

  if (errors.length > 0) {
    record.date = new Date(record.date)
    return res.render('edit', { errors, record, categories })
  }

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