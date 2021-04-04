const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const doteenv = require('dotenv').config()

const mainRouter = require('./routes/main')
const todosRouter = require('./routes/todos')
const authRoutes = require('./routes/auth')
const operationsRoutes = require('./routes/operations')
const GamesRoute = require('./routes/games')
const MenuRoute = require('./routes/menu')
const UserRoute = require('./routes/user')


const PORT = process.env.PORT || 8080

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())

require('./middleware/passport')(passport)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(mainRouter)
app.use(authRoutes)
app.use(todosRouter)
app.use(operationsRoutes)
app.use(GamesRoute)
app.use(MenuRoute)
app.use(UserRoute)



async function start() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, { 
      useFindAndModify: false, 
      useUnifiedTopology: true,
      useNewUrlParser: true
    })


    // start server
    app.listen(PORT, () => {
      console.log(`Server has been started on PORT: ${PORT}`)
      console.log(PORT);
    })
  } catch(e) {
    console.log(e);
  }
}

start()

