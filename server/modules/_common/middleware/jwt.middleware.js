const jwt = require('jsonwebtoken')
const passport = require('passport')
const path = require('ramda/src/path')

const config = require('../../../config/config')
const { getUserById } = require('../../v1/user/helpers/getUserById')
const { updateLastActive } = require('../../v1/user/helpers/updateLastActive')

function validate (req, res, next) {
  if (req.headers.authorization) {
    return passport.authenticate('jwt', { session: false })(req, res, next)
  } else {
    return next()
  }
}

function create (userObject) {
  const payload = {
    uid: userObject._id,
    username: userObject.username,
  }

  if (userObject.admin.is) {
    payload.isAdmin = true
    payload.roles = userObject.admin.roles || []
  }

  updateLastActive(userObject._id)

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtTokenExpirationTime,
  })
}

function required (req, res, next) {
  if (!req.authUser) {
    return res.status(401).json({
      'message': 'no-jwt',
      'status': 401,
      'statusText': 'Not Authorized',
    })
  }
  return next()
}

function checkRole (role) {
  return async function (req, res, next) {
    const user = await getUserById(req.authUser.uid)
    const roles = path(['admin', 'roles'], user)

    if (roles && roles.includes(role)) {
      return next()
    }

    return res.status(404).json({
      'message': 'no-endpoint',
      'status': 404,
      'statusText': 'Resource is not found',
    })
  }
}

module.exports = {
  validate, create, required, checkRole,
}
