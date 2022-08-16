const prefix = '/api/v1'
const postRoutes = require('./postRoutes')
const categoryRoutes = require('./categoryRoutes')
const pageRoute = require('./pageRoute')
const authRoute = require('./authRoute')
const router = (app) => {
  app.use(`${prefix}/posts`, postRoutes)
  app.use(`${prefix}/categories`, categoryRoutes)
  app.use(`${prefix}/pages`, pageRoute)
  app.use(`${prefix}/auth`, authRoute)
}

module.exports = router