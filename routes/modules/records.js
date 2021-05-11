const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

const generateTodayString = function () {
  const d = new Date()
  const month = (d.getMonth() + 1).toString()
  const day = (d.getDate()).toString()
  const year = d.getFullYear()

  const outputMonth = month.length < 2 ? '0' + month : month
  const outputDay = day.length < 2 ? '0' + day : day

  return [year, outputMonth, outputDay].join('-');
}

router.get('/new', (req, res) => {
  const today = generateTodayString()
  return res.render('new', { today })
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body

  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
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