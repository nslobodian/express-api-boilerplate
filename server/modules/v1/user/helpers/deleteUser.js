const mongoose = require('mongoose')

const { UserModel } = require('../user.model')

function delUser (id) {
  return UserModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(id),
    deleted: false,
  }, {
    deleted: true,
  }, {
    new: true,
  }).exec()
}

module.exports = {
  delUser,
}
