const { HttpError } = require('./HttpError')

/**
 * use when user doesn't have access to a given resource
 */
class BadRequestError extends HttpError {
  constructor (errCode) {
    super(errCode, 'Bad Request', 400)
  }
}

module.exports = {
  BadRequestError,
}
