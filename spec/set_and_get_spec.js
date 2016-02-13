'use strict';

var settings = require('./settings');

describe('Set and get settings test', function() {

  // Clear any existing database
  beforeAll(function(done) {
    settings.migrate_down()
      .then(function() {
        return settings.migrate_up()
      })
      .then(function() {
        done();
      });
  });

  afterAll(function(done) {
    settings.migrate_down()
      .then(function() {
        done();
      });
  });

  it("should fail to get value for key 'test'", function(done) {

    settings.get('test')
      .then(function(result) {
        expect(result).toBeUndefined();
      })
      .catch(function(err) {
        console.error(err);
        fail('Unexpected exception');
      })
      .finally(function() {
        done();
      });
  });

  it("should get default value of 'result' for key 'test'", function(done) {

    settings.get('test', 'result')
      .then(function(result) {
        expect(result).toEqual('result');
      })
      .catch(function(err) {
        console.error(err);
        fail('Unexpected exception');
      })
      .finally(function() {
        done();
      });
  });

  it("should set value of 'set' for key 'test'", function(done) {
    
    settings.set('test', 'set')
      .then(function() {
        return settings.get('test')
      })
      .then(function(result) {
        expect(result).toEqual('set');
      })
      .catch(function(err) {
        console.error(err);
        fail('Unexpected exception');
      })
      .finally(function() {
        done();
      });
  });

  it("should set value of 'test' for key 'test'", function(done) {
    
    settings.set('test', 'test')
      .then(function() {
        return settings.get('test')
      })
      .then(function(result) {
        expect(result).toEqual('test');
      })
      .catch(function(err) {
        console.error(err);
        fail('Unexpected exception');
      })
      .finally(function() {
        done();
      });
  });

  it("should remove key 'test'", function(done) {

    settings.del('test')
      .then(function() {
        return settings.get('test');
      })
      .then(function(result) {
        expect(result).toBeUndefined();
      })
      .catch(function(err) {
        console.error(err);
        fail('Unexpected exception');
      })
      .finally(function() {
        done();
      });
  });

  it("should set value for key 'test' to object { value: 'test' }", function(done) {

    settings.set('test', { value: 'test' })
      .then(function() {
        return settings.get('test');
      })
      .then(function(value) {
        expect(value.value).toEqual('test');
      })
      .finally(function() {
        done();
      });
  });

  it("should set value for key 'test' to array [1, 2, 3]", function(done) {

    settings.set('test', [1, 2, 3])
      .then(function() {
        return settings.get('test');
      })
      .then(function(value) {
        expect(value.length).toEqual(3);
        expect(value[0]).toEqual(1);
        expect(value[1]).toEqual(2);
        expect(value[2]).toEqual(3);
      })
      .finally(function() {
        done();
      });
  });

  it("should set value for key 'test' to number 1.0", function(done) {

    settings.set('test', 1.0)
      .then(function() {
        return settings.get('test');
      })
      .then(function(value) {
        expect(value).toEqual(1.0);
      })
      .finally(function() {
        done();
      });
  });

});

