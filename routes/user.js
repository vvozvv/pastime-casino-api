const { Router } = require('express')
const router = Router()
const controller = require('../controllers/user')
const doteenv = require('dotenv').config()

router.get(`${process.env.PREFIX}/user`, controller.get);
router.post(`${process.env.PREFIX}/user/coin`, controller.coin);

module.exports = router