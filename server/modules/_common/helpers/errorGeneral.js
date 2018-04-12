const _ = require('underscore')
const expressValidation = require('express-validation')

const errorsSet = require('../errors/errors')

function handleErrorsFromValidation (err, lang) {
  return {
    message: err.message,
    errors: err.errors.map((one) => {
      let out = ''
      for (const key in one.messages) {
        if (!one.messages.hasOwnProperty(key)) {
          continue // eslint-disable-line no-continue
        }

        if (_.has(errorsSet[lang], one.messages[key])) {
          out += errorsSet[lang][one.messages[key]]
        } else {
          out += one.messages[key]
        }
      }

      one.message = out

      one.errCode = 'err-input-validation'

      return one
    }),
    status: err.status,
    statusText: err.statusText,
  }
}

function resolveError (err, req, res, next) {
  if (_.has(err, 'isCustom')) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: errorsSet[req.language][err.message],
      status: err.status,
      statusCode: err.statusCode,
    })

    return next()
  }

  if (err instanceof expressValidation.ValidationError) {
    console.error(err) // eslint-disable-line no-console

    res.status(400).json(handleErrorsFromValidation(err, req.language))

    return next()
  }

  if (err instanceof SyntaxError) {
    console.error(err) // eslint-disable-line no-console

    res.status(400).json({
      'message': 'SyntaxError',
      'errors': [],
    })

    return next()
  }

  return next(err)
}

module.exports = {
  resolveError,
  handleErrorsFromValidation,
}
