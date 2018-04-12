const money = require('money-math')

function floatToAmount (f) {
  return money.floatToAmount(typeof f === 'string' ? f.replace(/,/, '.') : f)
}

module.exports = {
  floatToAmount,
}
