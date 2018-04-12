const express = require('express')
const validate = require('express-validation')

const jwtValidation = require('../_common/middleware/jwt.middleware')
const userValidation = require('./user.validator')
const userController = require('./user.controller')

const router = express.Router()

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       userId:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns list of user
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     parameters:
 *       - $ref: '#/parameters/page'
 *       - $ref: '#/parameters/perPage'
 *       - name: userId
 *         description: user id
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             pagination:
 *               type: object
 *               $ref: '#/definitions/Pagination'
 *             where:
 *               type: object
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create user
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: user id.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 */

router.route('/')
  .get(
    jwtValidation.required,
    validate(userValidation.list),
    userController.listUser
  )
  .post(
    jwtValidation.required,
    validate(userValidation.create),
    userController.addUser
  )

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get user with specific id
 *     tags:
 *      - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         $ref: '#/definitions/User'
 *
 *   put:
 *     description: Update user
 *     tags:
 *      - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *       - name: name
 *         type: string
 *         in: body
 *     responses:
 *       200:product
 *         $ref: '#/definitions/User'
 *
 *   delete:
 *     description: Delete specific user
 *     tags:
 *      - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: delete at first time
 *         $ref: '#/definitions/User'
 *       404:
 *         description: delete non-existing user
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.route('/:id')
  .get(
    jwtValidation.required,
    validate(userValidation.get),
    userController.getUser
  )
  .put(
    jwtValidation.required,
    validate(userValidation.update),
    userController.putUser
  )
  .delete(
    jwtValidation.required,
    validate(userValidation.delete),
    userController.deleteUser
  )

module.exports = router
