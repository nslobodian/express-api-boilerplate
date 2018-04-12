const merge = require('lodash.merge')

const { UserModel } = require('../user.model')
const { translationQuery } = require('../../_common/helpers/translationQuery')
const { formatPagination } = require('../../_common/helpers/formatPagination')

async function findUser (params) {
  const defaultParams = {
    pagination: {
      page: 1,
      perPage: 20,
      limit: null,
    },
    where: {},
  }

  const options = merge(defaultParams, params)
  const query = {
    deleted: false,
  }

  if (options.where.title) {
    query.$and = translationQuery(query, 'title', options.where.title)
  }

  if (options.where.value) {
    query.$text = { $search: options.where.value }
  }

  const result = await formatPagination(UserModel, query, options)

  return {
    pagination: result.meta.pagination,
    where: result.meta.where,
    data: result.data,
  }
}

module.exports = {
  findUser,
}
