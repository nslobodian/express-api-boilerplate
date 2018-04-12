const Joi = require('joi')

module.exports = {
  validId: {
    params: {
      id: Joi.string().length(24).required(),
    },
  },
}
