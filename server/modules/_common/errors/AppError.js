class AppError extends Error {
  constructor (name, status = 'BAD REQUEST', statusCode = 400) {
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
  AppError,
}
