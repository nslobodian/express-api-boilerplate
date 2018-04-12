const { HttpError } = require('./HttpError')

/**
 * use when request is correct but for some semantic reason (business logic) we cannot process the request
 * on a given resource
 */
class UnprocessableEntityError extends HttpError {
  constructor (errCode) {
    super(errCode, 'Unprocessable Entity', 422)
  }
}

module.exports = {
  UnprocessableEntityError,
}
