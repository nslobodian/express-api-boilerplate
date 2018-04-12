const { HttpError } = require('../../_common/errors/HttpError')
const { en } = require('../errors/errors')

function httpErrorHandlerMiddleware (err, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.statusCode || 500)

    let errorMessage = err.message
    let errorMessages = []

    if (errorMessages.length > 0) {
      return res.json({
        status: err.status || 500,
        statusCode: err.statusCode || 'Internal Error',
        messages: errorMessages,
      })
    } else {
      return res.json({
        status: err.status || 500,
        statusCode: err.statusCode || 'Internal Error',
        message: en[errorMessage] || errorMessage,
      })
    }
  }

  return next(err)
}

module.exports = {
  httpErrorHandlerMiddleware,
}
