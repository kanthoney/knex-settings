'use strict';

var db = require('knex')({ client:'sqlite3', connection:{ filename: 'test.sqlite' }, useNullAsDefault: true});
module.exports = require('../index')(db, 'settings');

