const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  admin: {
    is: Boolean,
    roles: [String],
  },
})

const UserModel = mongoose.model('UserModel', userSchema, 'users')

module.exports = {
  UserModel,
}
