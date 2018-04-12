const passportJWT = require('passport-jwt')

const config = require('../../../config/config')
const { ForbiddenError } = require('../errors/ForbiddenError')

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
  jsonWebTokenOptions: {
    expiresIn: config.jwtTokenExpirationTime,
  },
  passReqToCallback: true,
}

function jwtStrategy () {
  return new JwtStrategy(opts, function (req, payload, done) {
    payload.isGuest = !!payload.isGuest
    if (!req.allowNonAdmin && !payload.isAdmin) {
      throw new ForbiddenError('not-admin')
    }

    req.authUser = {
      'username': payload.username,
      'uid': payload.uid,
    }

    req.authUser.isAdmin = payload.isAdmin
    req.authUser.roles = payload.roles

    return done(null, payload)
  })
}

module.exports = {
  jwtStrategy,
}
