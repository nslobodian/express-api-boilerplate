const handlebarsPluralize = require('handlebars-helper-pluralize')

const moduleGenerator = require('./module/index.js')
const modelGenerator = require('./model/index.js')

module.exports = plop => {
  plop.setGenerator('module', moduleGenerator)
  plop.setGenerator('model', modelGenerator)
  plop.setHelper('pluralize', word => handlebarsPluralize(3, word))
}
