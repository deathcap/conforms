'use strict';

function conforms(actual, expected, note) {
  if (typeof expected !== typeof actual) {
    throw new Error('value '+actual+
      (note ? ' of property "'+note+'" ' : ' ')+
      'expected '+typeof expected+', but got '+typeof actual);
  }

  // {} and [] both have typeof 'object', so differentiate them here
  if (Array.isArray(expected) !== Array.isArray(actual)) {
      throw new Error('object property "'+name+'" expected '+
        (Array.isArray(expected) ? 'array ' : 'non-array ') +
        typeof(expected) +
        ', but got '+
        (Array.isArray(actual) ? 'array ' : 'non-array ') +
        typeof(actual));
  }
  // TODO: check heterogenous array types?

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
