function isObjectIdValid (id) {
  const pattern = new RegExp(/^[a-fA-F0-9]{24}$/)

  return pattern.test(id)
}

module.exports = {
  isObjectIdValid,
}
