'use strict';

var test = require('tape');

var conforms = require('./');

test('primitive', function(t) {

  conforms(1, 2);         // number
  conforms('foo', 'bar'); // string
  conforms(true, false);  // boolean
  conforms(undefined, undefined);  // undefined
  conforms({}, {});       // non-array object
  conforms([], []);       // array object
  conforms(function(a,b){return a+b}, function(c,d){return c*d});

  t.throws(function() {
    conforms(42, 'string');
  });

  t.throws(function() {
    conforms('string', 42);
  });

  t.end();
});

test('duck', function(t) {

  var duck = {
    quack: function() {},
  };

  t.throws(function() {
    conforms({}, duck);
  });

  t.throws(function() {
    conforms({quack: 1}, duck);
  });

  conforms({quack: function() { console.log('quack'); }}, duck);

  t.end();
});

// TODO: check conforms(, non-object)

test('group', function(t) {

  var group = {
    gid: 100,
    members: [],
    settings: {},
  };

  t.throws(function() {
    conforms({}, group);
  });

  t.throws(function() {
    conforms({gid: 42, members: 'wrong'}, group);
  });

  conforms({
    gid: 43,
    members: [1,2,3],
    settings: {},
  }, group);

  conforms({ gid: 0, members: [], settings: {}, }, group);


  // given object, expected array
  t.throws(function() {
    conforms({gid: 44, members: {}, settings: {}}, group);
  });

  // given array, expected object
  t.throws(function() {
    conforms({gid: 45, members: [], settings: []}, group);
  });

  t.end();
});

test('recursive', function(t) {

  t.throws(function() {
    // actual is missing foo.bar
    conforms({foo: {}}, {foo: {bar: 'baz'}});
  });

  t.throws(function() {
    conforms({foo: {bar: 1}}, {foo: {bar: 'baz'}});
  });

  // the inverse is accepted, since the superfluous property not required by the interface is ignored (superset conforms)
  conforms({foo: {bar: 'baz'}}, {foo: {}});

  // exact match
  conforms({foo: {bar: 'baz'}}, {foo: {bar: 'baz'}});
 
  t.end();
});
