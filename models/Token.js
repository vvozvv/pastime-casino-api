const { Schema, model } = require('mongoose')

const shema = new Schema({
  token: {
    type: String,
    default: ""
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }
})

module.exports = model('Token', shema)