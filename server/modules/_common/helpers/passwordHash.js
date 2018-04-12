const sha256 = require('sha256')
const bcrypt = require('bcrypt')

const config = require('../../../config/config')

function create (plainTextPassword) {
  return bcrypt.hashSync(sha256.x2(plainTextPassword) + config.passSalt, 2) // eslint-disable-line no-sync
}

function compare (myPlaintextPassword, hash) {
  return bcrypt.compareSync(sha256.x2(myPlaintextPassword) + config.passSalt, hash) // eslint-disable-line no-sync
}

module.exports = {
  create, compare,
}
