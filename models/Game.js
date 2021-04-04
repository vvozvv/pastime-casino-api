const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    require: true,
    type: String
  },
  description: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true
  },
  minRate: {
    type: Number,
    default: 0
  },
  maxRate: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean
  },
})

module.exports = model('Game', schema)