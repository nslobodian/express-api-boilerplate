function formatUser (user) {
  return {
    userId: user._id,
    title: user.title,
    value: user.value,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

module.exports = {
  formatUser,
}
