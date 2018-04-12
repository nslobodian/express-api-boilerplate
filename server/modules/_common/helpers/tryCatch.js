const Debug = require('debug')
const debug = new Debug('server:common:tryCatch')

async function tryCatch (data, formatMethod, options = {}) {
  const result = await Promise.all(data.map(async function (obj = {}) {
    try {
      const o = formatMethod(obj, options)
      if (o.then) {
        return await o
      }
      return o
    } catch (e) {
      debug(e)
      return {
        error: true,
        _id: obj._id,
      }
    }
  }))

  if (options.noErrors) {
    return result.filter(({ error }) => !error)
  }

  return result
}

module.exports = {
  tryCatch
}
