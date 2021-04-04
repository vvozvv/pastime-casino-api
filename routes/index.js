const mainRouter = require('./main')
const todosRouter = require('./todos')
const authRoutes = require('./auth')
const operationsRoutes = require('./operations')
const GamesRoute = require('./games')
const MenuRoute = require('./menu')
const UserRoute = require('./user')

module.exports = {
  mainRouter,
  todosRouter,
  authRoutes,
  operationsRoutes,
  GamesRoute,
  MenuRoute,
  UserRoute
}