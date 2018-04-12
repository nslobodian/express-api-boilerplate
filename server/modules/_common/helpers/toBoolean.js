function toBoolean (val) {
  return !!(val === '' || val && val !== '0' && val !== 'false') // eslint-disable-line no-mixed-operators
}

module.exports = {
  toBoolean,
}
