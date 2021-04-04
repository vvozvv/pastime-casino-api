const { Router } = require('express')
const router = Router()
const controller = require('../controllers/menu')
const doteenv = require('dotenv').config()

router.get(`${process.env.PREFIX}/menu`, controller.getActiveMenu)
router.get(`${process.env.PREFIX}/menu/all`, controller.getAllMenu)
router.post(`${process.env.PREFIX}/menu`, controller.addItemMenu)
router.put(`${process.env.PREFIX}/menu`, controller.changeitemMenu)
router.delete(`${process.env.PREFIX}/menu`, controller.deleteItemMenu)

module.exports = router