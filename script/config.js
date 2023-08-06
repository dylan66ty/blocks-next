const path = require('path')

module.exports = require('dotenv').config({
  path: path.resolve(`${process.cwd()}/.publish.env`)
}).parsed
