const Joi = require('joi')

module.exports = {
  list: {
    query: {
      page: Joi.number().positive(),
      perPage: Joi.number().positive(),
      title: Joi.string().max(256),
      value: Joi.number(),
    },
  },
  create: {
    body: {
      title: Joi.string().max(256),
      value: Joi.number(),
    },
  },
  get: {
    params: {
      id: Joi.string().required(),
    },
  },
  update: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      title: Joi.string().max(256),
      value: Joi.number(),
    },
  },
  delete: {
    params: {
      id: Joi.string().required(),
    },
  },
}
