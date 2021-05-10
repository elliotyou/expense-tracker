const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    require: true
  }
})

mmodule.exports = mongoose.model('Record', recordSchema)