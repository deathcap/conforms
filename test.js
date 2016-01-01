'use strict';

var test = require('tape');

var conforms = require('./');

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

  t.equal(conforms({quack: function() { console.log('quack'); }}, duck), true);

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

  t.equal(conforms({
    gid: 43,
    members: [1,2,3],
    settings: {},
  }, group), true);

  t.equal(conforms({ gid: 0, members: [], settings: {}, }, group), true);


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
