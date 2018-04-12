if (process.env.NODE_ENV === 'development') {
  require('pretty-error').start()
}

const Debug = require('debug')
const mongoose = require('mongoose')

const config = require('./config/config')
const app = require('./app')

const debug = Debug('server')

mongoose.Promise = global.Promise

mongoose.connect(config.db, {
  server: {
    socketOptions: {
      keepAlive: 1,
    },
  },
}, () => {
  debug('✓ MongoDB')
})

if (process.env.DEBUG) {
  mongoose.set('debug', true)
}

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${config.db}`)
})

app.listen(config.port, () => {
  debug(`✓ HTTP Server (${config.port} / ${config.env})`)
})

module.exports = app
