const escapeRegex = (value = '') =>
  new RegExp(value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i') // eslint-disable-line

module.exports = {
  escapeRegex,
}
