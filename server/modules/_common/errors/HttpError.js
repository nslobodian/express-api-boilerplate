class HttpError extends Error {
  constructor (name, status = 'Internal Server Error', statusCode = 500) {
    super(name)
    this.name = name
    this.isCustom = true
    this.status = status
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = {
  HttpError,
}
