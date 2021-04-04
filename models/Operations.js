const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    require: true,
    type: String
  },
  user_id: [{
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  date: { type: Date, default: Date.now },
  total: {
    require: true,
    type: Number
  },
  result: {
    require: true,
    type: Boolean
  },
  
})

module.exports = model('Operations', schema)