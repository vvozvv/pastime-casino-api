const { Router } = require('express')
const { get } = require('./main')
const router = Router()
const Todo = require('../models/Todo')
const User = require('../models/User')

router.get('/todos', async (req, res) => {
  const todos = await Todo.find()
  res.send(todos)
})

router.get('/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.post('/completed', async (res, req) => {
  
  // const todo = await Todo.findByIdAndUpdate(req.body)

  console.log(req.params)
  console.log(req.body)
})

module.exports = router