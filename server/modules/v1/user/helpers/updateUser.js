const mongoose = require('mongoose')

const { UserModel } = require('../user.model')

async function updateUser (id, data) {
  return UserModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(id),
  }, data, {
    new: true,
  })
}

module.exports = {
  updateUser,
}
