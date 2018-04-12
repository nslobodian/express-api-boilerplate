const { UserModel } = require('../user.model')

function createUser (data) {
  return UserModel.create({
    title: data.title,
    value: data.value,
  })
}

module.exports = {
  createUser,
}
