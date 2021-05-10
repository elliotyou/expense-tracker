const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  date: {
    type: String,
  },
  category: {
    type: String,
  },
  amount: {
    type: Number,
  }
})

module.exports = mongoose.model('Record', recordSchema)