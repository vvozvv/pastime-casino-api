const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    require: true,
    type: String,
    unique: true
  },
  url: {
    type: String,
    require: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: false
  },
}, {timestamps: true})

module.exports = model('Menu', schema)