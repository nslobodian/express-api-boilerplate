const mongoose = require('mongoose')

const { UserModel } = require('../user.model')

async function readUser (id) {
  return UserModel.findOne({
    _id: mongoose.Types.ObjectId(id),
    deleted: false,
  }).exec()
}

module.exports = {
  readUser,
}
