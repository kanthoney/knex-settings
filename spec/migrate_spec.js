'use strict';

var settings = require('./settings');

describe('Basic migration test', function() {

  // Clear any existing test database
  beforeAll(function(done) {
    settings.migrate_down()
      .then(function() {
        done();
      });
  });

  it('should migrate up', function(done) {
    settings.migrate_up()
      .catch(function() {
        fail('did not migrate up');
      })
        .finally(function() {
          done();
        });
  });

  it('should migrate down', function(done) {
    return settings.migrate_down()
      .catch(function() {
        fail('did not migrate down');
      })
        .finally(function() {
          done();
        });
  });

});

