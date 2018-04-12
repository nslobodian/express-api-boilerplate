const languages = ['sk', 'en', 'cz', 'hu']

function translationQuery (query, field, text, lng, options = {}) {
  const and = query.$and || []
  const langs = lng && languages.includes(lng)
    ? [lng]
    : languages
  and.push({
    '$or': langs.map(l =>
      ({
        [`${field}.${l}${options.afterCode ? '.' + options.afterCode : ''}`]: options.plainText
          ? text
          : { $regex: new RegExp(text, 'i') }
      })),
  })

  return and
}

module.exports = {
  translationQuery,
}
