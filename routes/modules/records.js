const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const tools = require('../../tools/tools')

router.get('/new', (req, res) => {
  const today = tools.generateTodayString()
  return res.render('new', { today })
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  return Record.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .lean()
    .then((record) => {
      const categoryObject = tools.generateCategoryObject(record.category)
      res.render('edit', { record, categoryObject })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router