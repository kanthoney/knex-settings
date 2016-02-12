# knex-settings

`knex-settings` encapsulates a simple key-value table, using the [`knex`](http://knexjs.org) query builder.

## Installation

```
npm install knex-settings
```

## Usage

* Create your `knex` instance.

```
var db = require('knex')({ dialect: 'sqlite3', connection:{ filename: 'test.sqlite' } });
```

* Create a `knex-settings` object, passing the `knex` instance and the name of the settings table

```
var settings = require('knex-settings')(db, 'settings');
```

* Use `migrate_up` and `migrate_down` methods in a migrations file (or otherwise) to create the database table. Both `migrate_up` and `migrate_down` return promises.

```
exports.up = function()
{
  return settings.migrate_up();
}

exports.down = function()
{
  return settings.migrate_down();
}
```

* Use the `set(key)` method to set values for a key. `set` returns a promise.

```
settings.set('k', 'v');
```

* Use the `get(key, [default_value])` method to get a value. A promise is returned with the value.

```
settings.get('k')
.then(function(value) {
  console.log(value); // 'v'
});

settings.get('non_existent_key')
.then(function(value) {
  console.log(value); // value undefined
});

settings.get('non_existent_key', 'default_value')
.then(function(value)
{
  console.log(value); // 'default_value'
});

```

* Use the `del(key)` method to delete a key. A promise is returned.

```
settings.del('k')
.then(function() {
  return settings.get('k');
})
.then(function(value) {
  console.log(value); // value undefined
});
```

