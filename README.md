# Express ES2016 REST API Boilerplate
Boilerplate/Generator Project for building RESTful APIs using Node.js, Express and MongoDB

## Features
 - CORS enabled
 - Uses [yarn](https://yarnpkg.com)
 - Express + MongoDB ([Mongoose](http://mongoosejs.com/))
 - Consistent coding styles with [editorconfig](http://editorconfig.org)
 - Request validation with [joi](https://github.com/hapijs/joi)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Linting with [eslint](http://eslint.org)
 - Authentication and Authorization with [passport](http://passportjs.org)
 - API documentation geratorion with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
 - API geratorion with [plop](https://github.com/amwmedia/plop/)

## Requirements

 - [Node v8.3+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Installations

Copy `server/config/config.js.template` to `server/config/config.js`

1. yarn install
2. yarn run start:dev

## Generate route
1. `yarn generate`
2. Follow the instructions
