'use strict';

var test = require('tape');

var conforms = require('./');

test(function(t) {

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
