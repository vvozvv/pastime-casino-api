const { Router } = require('express')
const router = Router()
const passport = require('passport')
const controllers = require('../controllers/auth')
const doteenv = require('dotenv').config()

router.post(`${process.env.PREFIX}/login`, controllers.login);
router.post(`${process.env.PREFIX}/register`, controllers.register)
router.get(`${process.env.PREFIX}/auth`, passport.authenticate('jwt', {session: false}), controllers.auth)
router.post(`${process.env.PREFIX}/refresh`, controllers.refreshToken)
router.post(`${process.env.PREFIX}/logout`, controllers.logout)


module.exports = router
