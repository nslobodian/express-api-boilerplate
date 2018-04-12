const moduleExists = require('../utils/moduleExists')
const { destinyPath } = require('../config')

module.exports = {
  description: 'Add a Module',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'user',
    validate: value => {
      if ((/.+/).test(value)) {
        return moduleExists(value) ? 'A Module with this name already exists' : true
      }

      return 'The name is required'
    },
  },
  {
    type: 'confirm',
    name: 'wantModel',
    default: true,
    message: 'Do you want a Model?',
  }, {
    type: 'confirm',
    name: 'wantValidator',
    default: true,
    message: 'Do you want a Validation?',
  },
  {
    type: 'checkbox',
    name: 'controllerTypes',
    message: 'What controllers do you want?',
    choices: [
      { name: 'GET', value: 'find', checked: true },
      { name: 'CREATE', value: 'create' },
      { name: 'GET1', value: 'read', checked: true },
      { name: 'UPDATE', value: 'update' },
      { name: 'DELETE', value: 'delete' },
    ],
  },
  ],
  actions: data => {
    data.controllerTypes.push('format')
    data.controllerTypes.forEach(value => {
      data[`is${value.toUpperCase()}`] = true
    })

    const routerTemplate = './module/router.js.hbs'
    const controllerTemplate = './module/controller.js.hbs'

    const actions = [
      {
        type: 'add',
        path: destinyPath + '{{name}}.router.js',
        templateFile: routerTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: destinyPath + '{{name}}.controller.js',
        templateFile: controllerTemplate,
        abortOnFail: true,
      },
    ]

    if (data.wantValidator) {
      const validatorTemplate = './module/validator.js.hbs'

      actions.push({
        type: 'add',
        path: destinyPath + '{{name}}.validator.js',
        templateFile: validatorTemplate,
        abortOnFail: true,
      })
    }

    if (data.wantModel) {
      const modelTemplate = './module/model.js.hbs'
      const helperTemplate = './module/helpers/'

      actions.push({
        type: 'add',
        path: destinyPath + '{{name}}.model.js',
        templateFile: modelTemplate,
        abortOnFail: true,
      })

      data.controllerTypes.forEach(helperName => {
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
