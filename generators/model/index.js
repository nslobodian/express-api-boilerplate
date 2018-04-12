const entityExists = require('../utils/entityExists')
const { destinyPath } = require('../config')

module.exports = {
  description: 'Add an Model',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'user',
    validate: value => {
      if ((/.+/).test(value)) {
        return entityExists(value) ? 'An Model with this name already exists' : true
      }

      return 'The name is required'
    },
  }, {
    type: 'confirm',
    name: 'wantHelpers',
    default: true,
    message: 'Do you want model helpers?',
  }],
  actions: data => {
    let modelTemplate = './model/model.js.hbs'

    const actions = [
      {
        type: 'add',
        path: destinyPath + '{{name}}.model.js',
        templateFile: modelTemplate,
        abortOnFail: true,
      },
    ]

    if (data.wantHelpers) {
      const helperTemplate = './module/helpers/'
      const helpersList = ['create', 'delete', 'format', 'read', 'find', 'update']

      helpersList.forEach(helperName => {
        actions.push({
          type: 'add',
          path: `${destinyPath}helpers/${helperName}{{properCase name}}.js`,
          templateFile: `${helperTemplate}${helperName}.js.hbs`,
          abortOnFail: true,
        })
      })
    }

    return actions
  },
}
