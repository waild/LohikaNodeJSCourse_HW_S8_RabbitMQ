const config = require('./knexfile.js');

const env = process.env.NODE_ENV;
const knex = require('knex')(config[env || 'development']);

module.exports = knex;
