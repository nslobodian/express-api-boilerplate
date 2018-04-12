const RateLimit = require('express-rate-limit')

const apiLimiterMiddleware = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0,
})

module.exports = {
  apiLimiterMiddleware,
}
