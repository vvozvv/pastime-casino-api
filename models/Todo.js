const { Schema, model } = require('mongoose')

const shema = new Schema({
  title: {
    required: true,
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Todo', shema)