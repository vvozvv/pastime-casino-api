const { Schema, model } = require('mongoose')

let shema = new Schema({
  username: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  email: {
    type: String
  },
  coin: {
    type: Number,
    default: 0
  },
  operations: [{
    type: Schema.Types.ObjectId,
    ref: 'Operations',
    required: true
  }]
})


module.exports = model('User', shema)