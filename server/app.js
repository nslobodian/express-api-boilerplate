const Raven = require('raven')
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const i18n = require('i18n-2')
const path = require('path')

const config = require('./config/config')
const routes = require('./modules/router')
const { jwtStrategy } = require('./modules/_common/auth/jwtStrategy')
const errorGeneral = require('./modules/_common/helpers/errorGeneral')
const jwtValidation = require('./modules/_common/middleware/jwt.middleware')
const { httpErrorHandlerMiddleware } = require('./modules/_common/middleware/httpErrorHandler.middleware')
const { decodeQueryParamsMiddleware } = require('./modules/_common/middleware/decodeQueryParams.middleware')

const app = express()

app.enable('trust proxy')

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'Api',
      version: '1.0.0',
    },
    basePath: '/v1',
    produces: ['application/json'],
    consumes: ['application/json'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [
      { jwt: [] },
    ],
  },
  apis: ['./server/modules/v1/**/*.router.js', './server/docs/parameters.yaml'],
})
const swaggerUiHandler = swaggerUi.setup(swaggerSpec)

Raven.config(config.sentry.enableLogging
  ? config.sentry.dsn
  : false, {
  name: config.name,
  environment: config.env,
  parseUser: req => {
    if (req.authUser) {
      return {
        id: req.authUser.uid,
        username: req.authUser.username,
      }
    }

    return {
      id: '',
      username: '',
    }
  },
  autoBreadcrumbs: true,
}).install()

app.use(Raven.requestHandler())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,DELETE,OPTIONS,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  return next()
})

i18n.expressBind(app, {
  locales: ['en'],
  directory: path.join(__dirname, '/locales'),
  extension: '.json',
  objectNotation: false,
})

// for parsing multipart/form-data
app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(decodeQueryParamsMiddleware)

app.use(cookieParser())

// passport config
app.use(passport.initialize())
passport.use(jwtStrategy())

app.use('/', (req, res, next) => {
  req.language = config.defaultLanguage
  next()
}, jwtValidation.validate, routes)

app.use('/v1/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
app.use('/v1/docs/', swaggerUi.serve, swaggerUiHandler)

app.use(httpErrorHandlerMiddleware)

app.use(Raven.errorHandler())
app.use(errorGeneral.resolveError)

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500)

  let errorMessage = err.message

  res.json({
    status: err.status || 500,
    statusCode: err.statusCode || 'Internal Error',
    message: errorMessage,
    sentry: res.sentry,
  })

  console.log(err)
  if (config.env === 'development') {
    return next(err)
  }
})

module.exports = app
