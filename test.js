'use strict';

var test = require('tape');

var conforms = require('./');
var nconforms = require('./').nconforms;

test('primitive', function(t) {

  conforms(1, 2);         // integer number
  conforms(1.2, 3.4);     // non-integer number
  conforms('foo', 'bar'); // string
  conforms(true, false);  // boolean
  conforms(undefined, undefined);  // undefined
  conforms({}, {});       // non-array object
  conforms([], []);       // array object
  conforms(function(a,b){return a+b}, function(a,b){return a*b});
  conforms(undefined, undefined);

  nconforms(42, 'string');
  nconforms('string', 42);
  nconforms({}, []);
  nconforms([], {});
  nconforms(1, 1.2);
  nconforms(1.2, 1);

  t.end();
});

test('duck', function(t) {

  // if it quacks like a duck...
  var duck = {
    quack: function(volume) {},
  };

  var obj = {quack: function(volume) { console.log('quack'); }};
  conforms(obj, duck); // returns true

  conforms({quack: function(volume) { console.log('quack'); }}, duck);
  conforms({quack: function(volume, direction) { console.log('quack'); }}, duck);

  nconforms({quack: function() { console.log('quack'); }}, duck);
  nconforms({}, duck);
  nconforms({quack: 1}, duck);

  t.end();
});

// TODO: check conforms(, non-object)

test('group', function(t) {

  var group = {
    gid: 100,
    members: [],
    settings: {},
  };

  nconforms({}, group);
  nconforms({gid: 42, members: 'wrong'}, group);

  conforms({
    gid: 43,
    members: [1,2,3],
    settings: {},
  }, group);

  conforms({ gid: 0, members: [], settings: {}, }, group);


  // given object, expected array
  nconforms({gid: 44, members: {}, settings: {}}, group);

  // given array, expected object
  nconforms({gid: 45, members: [], settings: []}, group);

  t.end();
});

test('recursive', function(t) {

  // actual is missing foo.bar
  nconforms({foo: {}}, {foo: {bar: 'baz'}});

  nconforms({foo: {bar: 1}}, {foo: {bar: 'baz'}});

  // the inverse is accepted, since the superfluous property not required by the interface is ignored (superset conforms)
  conforms({foo: {bar: 'baz'}}, {foo: {}});

  // exact match
  conforms({foo: {bar: 'baz'}}, {foo: {bar: 'baz'}});

  // Error: value quux of property "foo.bar.baz" expected number, but got string
  nconforms({foo: {bar: {baz: 'quux'}}}, {foo: {bar: {baz: 1}}});
 
  t.end();
});

test('function', function(t) {

  conforms(function(){}, function(){});
  conforms(function(){return 1;}, function(){return 2;});

  // parameter names must match
  conforms(function(a){}, function(a){});
  nconforms(function(a){}, function(b){});

  // but extra parameters can be added
  conforms(function(a,b,c){}, function(a,b,c){});
  conforms(function(a,b,c){}, function(a,b){});
  conforms(function(a,b,c){}, function(a){});

  conforms(function(a){}, function(a){});
  nconforms(function(a){}, function(a,b){});
  nconforms(function(a){}, function(a,b,c){});

  t.end();
});
