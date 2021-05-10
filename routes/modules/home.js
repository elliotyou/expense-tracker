const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})

module.exports = router