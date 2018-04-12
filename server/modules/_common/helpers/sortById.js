function sortById (a, b) {
  if (a._id.toString() < b._id.toString()) {
    return 1
  }
  if (a._id.toString() > b._id.toString()) {
    return -1
  }
  return 0
}

module.exports = {
  sortById,
}
