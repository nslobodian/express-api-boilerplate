const removeEmptyProperties = (obj) => {
  const newObj = Object.assign({}, obj)

  Object.entries(newObj).forEach(([key, val]) => {
    if (val && typeof val === 'object') removeEmptyProperties(val)
    else if (val === null || val === undefined) delete newObj[key]
  })

  return newObj
}

module.exports = {
  removeEmptyProperties,
}
