'use strict';

function mtypeof(value) {
  var type = typeof value;

  if (type === 'object') {
    // {} and [] both have typeof 'object', so differentiate them here
    // TODO: check heterogenous array types?
    if (Array.isArray(value)) {
      return 'object array';
    } else {
      return 'object non-array';
    }
  } else if (type === 'number') {
    if (Number.isInteger(value)) {
      return 'number integer';
    } else {
      return 'number non-integer';
    }
  }

  return type;
}

function conforms(actual, expected, note) {
  if (mtypeof(expected) !== mtypeof(actual)) {
    throw new Error('value '+actual+
      (note ? ' of property "'+note+'" ' : ' ')+
      'expected '+mtypeof(expected)+', but got '+mtypeof(actual));
  }

  if (typeof(actual) === 'object' && !Array.isArray(actual)) {
    // recurse into object
    var keys = Object.keys(expected);
    for (var i = 0; i < keys.length; ++i) {
      var name = keys[i];
      var expected2 = expected[name];

      if (!(name in actual)) {
        throw new Error('object is missing property: "'+name+'": '+actual);
      }

      var actual2 = actual[name];

      conforms(actual2, expected2,
        (note ? note + '.' + name : name));
    } 
  }

  // TODO: integers vs floats?
  // TODO: isndarray?
  // TODO: allow undefined? typeof undefined === 'undefined'


  return true;
};

module.exports = conforms;
