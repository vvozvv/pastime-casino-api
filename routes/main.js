const { Router } = require('express')
const router = Router()

const arr = [0, 1, 2, 3]

router.get('/', (req, res) => {
  res.send(arr)
})

module.exports = router