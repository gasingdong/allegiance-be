const knex = require('knex')
const config = require('../knexfile')
console.log(process.env.DB_ENV, 'is this populated 🚫⛺️🦍')
const dbEnv = process.env.DB_ENV || 'development'

module.exports = knex(config[dbEnv])
