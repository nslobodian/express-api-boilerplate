async function formatPagination (model, query, options, aggregate) {
  let totalCount = 0
  if (aggregate) {
    const count = await model.aggregate([...query, { $count: 'count' }])
    totalCount = count.length > 0 ? count[0].count : 0
  } else {
    totalCount = await model.count(query)
  }
  const totalPages = parseInt(Math.ceil(totalCount / options.pagination.perPage), 10)

  if (totalCount <= options.pagination.perPage) {
    options.pagination.page = 1
  } else if (options.pagination.page > totalPages) {
    options.pagination.page = totalPages
  }

  let data
  if (options.pagination.limit) {
    data = aggregate
      ? await model.aggregate(query).limit(parseInt(options.pagination.limit, 10))
      : await model.find(query).lean().limit(parseInt(options.pagination.limit, 10))
  } else {
    let execFn = (aggregate ? model.aggregate(query) : model.find(query).lean())
      .skip(parseInt(options.pagination.perPage * (options.pagination.page - 1), 10))
      .limit(parseInt(options.pagination.perPage, 10))

    if (!aggregate) {
      execFn.sort(options.sort)
    }

    data = await execFn
  }

  const result = {
    meta: {
      pagination: {
        page: parseInt(options.pagination.page, 10),
        perPage: parseInt(options.pagination.perPage, 10),
        pages: totalPages,
        totalCount: totalCount,
      },
      where: {},
    },
    data,
  }

  if (options.pagination.limit) {
    result.meta.pagination = {
      limit: options.pagination.limit,
    }
  }

  Object.keys(options.where).forEach(key => {
    if (options.where[key] !== undefined) {
      result.meta.where[key] = options.where[key]
    }
  })

  return result
}

module.exports = {
  formatPagination,
}
