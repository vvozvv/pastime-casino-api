const { verify } = require('jsonwebtoken')
require('dotenv').config()


const checkJwt = async (req, res, next) => {

  const authorization = req.headers.authorization

  if (authorization) {
    const token = authorization.split(' ')[1]

    verify(token, process.env.PASSPORT_SECRET, (err) => {
      if (err) {
        return res.status(401).send({
          message: "Токен просрочен"
        })
      }
    })
    return next()
  }

  res.status(403)
}

module.exports = checkJwt