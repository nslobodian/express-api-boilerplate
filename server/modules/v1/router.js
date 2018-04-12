const express = require('express')

const userRouter = require('./user/user.router')
const { apiLimiterMiddleware } = require('../_common/middleware/apiLimiter.middleware')

const router = express.Router()

router.get('/health-check', (req, res, next) => {
  return res.status(200).json({
    api: 'OK',
  })
})

router.use('/users', apiLimiterMiddleware, userRouter)

module.exports = router
