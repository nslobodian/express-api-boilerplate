const { HttpError } = require('./HttpError')

/**
 * if something broke on the server itself
 */
class InternalServerError extends HttpError {
  constructor (errCode) {
    super(errCode, 'Internal Server Error', 500)
  }
}

module.exports = {
  InternalServerError,
}
