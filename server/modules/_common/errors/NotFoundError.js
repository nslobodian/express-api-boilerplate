const { HttpError } = require('./HttpError')

/**
 * use when request is missing data or is not correct
 */

class NotFoundError extends HttpError {
  constructor (errCode) {
    super(errCode, 'Not Found', 404)
  }
}

module.exports = {
  NotFoundError,
}
