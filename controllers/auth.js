const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Token = require('../models/Token')
const { use } = require('../routes/auth')
const jwt = require('jsonwebtoken')
const errorHeandler = require('../utils/errorHeandler')
const doteenv = require('dotenv')

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyIiwidXNlcklkIjoiNjA0MWY4NTE3NGQ3N2QxYTM0NDBhYmVlIiwiaWF0IjoxNjE2NTkzNjY0LCJleHAiOjE2MTY1OTM3MjR9.eO4VvmntyRqBxupM10Yv1QYT7rYHGT0PR-ow5-lGnYo"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyIiwidXNlcklkIjoiNjA0MWY4NTE3NGQ3N2QxYTM0NDBhYmVlIiwiaWF0IjoxNjE2NTkzNjY0LCJleHAiOjE2MTY1OTM3MjR9.eO4VvmntyRqBxupM10Yv1QYT7rYHGT0PR-ow5-lGnYo

module.exports.logout = async function (req, res) {

  const foundToken = await Token.findOne({token: req.body.refreshToken})
  console.log(req.body.refreshToken);

  if (!foundToken) {
    return res.status(403).json({
      message: 'Пользователь не авторизован'
    })
  }

  await Token.findByIdAndDelete(foundToken._id)

  return res.status(200).json({
    message: 'Пользователь вышел из сети'
  })
}

module.exports.refreshToken = async ({body: { refreshToken }}, res) => {
  // Проверка если токен в запросе

  if (!refreshToken) {
    return res.status(403).send({
      message: 'Токена нет в запросе'
    })
  }

  // Поиск в базе данных
  const currentToken = await Token.findOne({token: refreshToken})

  // Если нет
  if (!currentToken) {
    return res.status(403).send({
      message: 'Токена нет в базе данных'
    })
  }


  jwt.verify(refreshToken, process.env.PASSPORT_SECRET_REFRESH, (err, user) => {
    if (err) {
      return res.status(403).send({
        message: 'Действие запрещено.'
      })
    }
    
    const accesToken = jwt.sign({
      email: user.email,
      userId: user._id
    }, process.env.PASSPORT_SECRET, {expiresIn: '1m'})
    

    console.log('token'+accesToken);
    return res.status(200).send({
      token: `Bearer ${accesToken}`
    })
  })

}

module.exports.login = async function(req, res) {
  const user = await User.findOne({email: req.body.email})

  if(user) {

    const passportResult = bcrypt.compareSync(req.body.password, user.password)
    if(passportResult) {
      // generate token
      const token = jwt.sign({
        email: user.email,
        userId: user._id
      }, process.env.PASSPORT_SECRET, {expiresIn: '1m'})
      // generate refresh token
      const refreshToken = jwt.sign({
        email: user.email,
        userId: user._id
      }, process.env.PASSPORT_SECRET_REFRESH)

      const foundToken = await Token.findOne({
        user: user._id
      })

      if (foundToken) {
        await Token.findByIdAndUpdate(foundToken._id, {token: refreshToken})

        return res.status(200).json({
          token: `Bearer ${token}`,
          refreshToken: refreshToken,
          user: user.username,
          coin: user.coin,
          operations: user.operations,
          id: user._id
        })
      }

      const item = new Token({token: refreshToken, user: user._id})
      await item.save()

      return res.status(200).send({
        token: `Bearer ${token}`,
        refreshToken,
        user: user.username,
        coin: user.coin,
        operations: user.operations,
        id: user._id
      })

      
    } else {
      // пароли не совпадают
      res.status(401).json({
        message: 'Пароли не совпадают.'
      })
    }
  } else {
    res.status(400).json({
      message: 'Пользователь не найден'
    })
  }
}

module.exports.register = async function(req, res) {
  //email, password
  const user = await User.findOne({
    email: req.body.email
  })

  if (user) {
    res.status(409).json({
      message: 'Такой пользователь уже есть'
    })
  } else {
    const salt = await bcrypt.genSaltSync(10)
    const password = await req.body.password

    const succesUser = new User({
      email: req.body.email, 
      username: req.body.username, 
      password: bcrypt.hashSync(password, salt),
      coin: process.env.DEFAULT_COINS_VALUE
    })

    try {
      await succesUser.save()
      res.status(201).json({
        user: succesUser
      })
    } catch(e) {
      errorHeandler(res, e)
    }    
  }
}
module.exports.auth =  (req, res)  => {
  res.status(200).json({
    message: 'Вы авторизированны'
  })
}