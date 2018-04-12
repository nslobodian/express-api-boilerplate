const { findUser } = require('./helpers/findUser')
const { createUser } = require('./helpers/createUser')
const { formatUser } = require('./helpers/formatUser')
const { updateUser } = require('./helpers/updateUser')
const { readUser } = require('./helpers/readUser')
const { delUser } = require('./helpers/deleteUser')
const { NotFoundError } = require('../_common/errors/NotFoundError')

async function listUser (req, res, next) {
  const {
    page,
    perPage,
    title,
    value,
  } = req.query

  try {
    const users = await findUser({
      pagination: {
        page,
        perPage,
      },
      where: {
        title,
        value,
      },
    })

    res.status(200).json({
      pagination: users.pagination,
      where: users.where,
      users: await Promise.all(users.data.map(formatUser)),
    })
  } catch (err) {
    return next(err)
  }
}

async function addUser (req, res, next) {
  const data = {
    title: req.body.title,
    value: req.body.value,
  }

  try {
    const attribute = await createUser(data)

    res.status(201).json(formatUser(attribute))
  } catch (err) {
    return next(err)
  }
}

async function getUser (req, res, next) {
  const { id } = req.params

  try {
    const result = await readUser(id)

    if (!result) {
      throw new NotFoundError('err-user-not-found')
    }

    res.status(200).json(await formatUser(result))
  } catch (err) {
    return next(err)
  }
}

async function putUser (req, res, next) {
  const { id } = req.params
  const data = {
    title: req.body.title,
    value: req.body.value,
  }

  try {
    const updatedUser = await updateUser(id, data)

    res.status(200).json(await formatUser(updatedUser))
  } catch (err) {
    return next(err)
  }
}

async function deleteUser (req, res, next) {
  const { id } = req.params

  try {
    const result = await delUser(id)

    if (!result) {
      throw new NotFoundError('err-user-not-found')
    }

    res.status(200).json(await formatUser(result))
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  putUser,
  deleteUser,
  getUser,
  addUser,
  listUser,
}
