'use strict';

module.exports = function(db, table_name)
{
  var migrate_up = function()
  {
    return db.schema.createTableIfNotExists(table_name, function(table) {
      table.string('key_name').primary();
      table.text('value');
    });
  }

  var migrate_down = function()
  {
    return db.schema.dropTableIfExists(table_name);
  }

  var set = function(key, value)
  {
    return db(table_name).insert({key_name:key, value:JSON.stringify(value)})
      .catch(function() {
        return db(table_name).where({key_name: key}).update({value: JSON.stringify(value)});
      });
  }

  var get = function(key, default_value)
  {
    return db(table_name).where({key_name: key}).select('value')
      .then(function(rows) {
        if(rows.length == 0) {
          return default_value;
        }
        return JSON.parse(rows[0].value);
      });
  }

  var del = function(key)
  {
    return db(table_name).where({key_name: key}).del();
  }

  return {
    migrate_up: migrate_up,
    migrate_down: migrate_down,
    set: set,
    get: get,
    del: del
  }

}

