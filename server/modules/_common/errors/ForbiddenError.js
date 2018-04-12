const { HttpError } = require('./HttpError')

/**
 * use when user don't have rights for specific resource
 */

class ForbiddenError extends HttpError {
  constructor (errCode) {
    super(errCode, 'Forbidden', 403)
  }
}

module.exports = {
  ForbiddenError,
}
