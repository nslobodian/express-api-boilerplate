function decodeObjectValues (query) {
  const _query = {}
  Object.keys(query).forEach(key => {
    _query[key] = typeof query[key] === 'string'
      ? decodeURIComponent(query[key])
      : query[key]
  })
  return _query
}

function decodeQueryParamsMiddleware (req, res, next) {
  if (req.query) {
    req.query = decodeObjectValues(req.query)
  }

  return next()
}

module.exports = {
  decodeQueryParamsMiddleware,
}
