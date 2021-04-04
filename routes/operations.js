const { Router } = require('express')
const { get } = require('./main')
const router = Router()
const controller = require('../controllers/operations')
const jwtCheck = require('../middleware/jwtCheck')

router.post(`${process.env.PREFIX}/operations/add`, controller.add)
router.get(`${process.env.PREFIX}/operations/get`, controller.getLastGames)
router.post(`${process.env.PREFIX}/operations/user`, jwtCheck, controller.getUserOperation)

module.exports = router
