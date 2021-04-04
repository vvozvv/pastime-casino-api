const { Router } = require('express')
const router = Router()
const controller = require('../controllers/games')
const doteenv = require('dotenv').config()


router.get(`${process.env.PREFIX}/games`, controller.getAllGame)
router.get(`${process.env.PREFIX}/games/active`, controller.getACctiveGame)
router.post(`${process.env.PREFIX}/games`, controller.add)
router.delete(`${process.env.PREFIX}/games`, controller.delete)
router.post(`${process.env.PREFIX}/games/update`, controller.update)

module.exports = router