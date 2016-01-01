'use strict';

var functionToString = require('function-to-string');

// Get a more usefully informative type of a value TODO: refactor into separate module? is there one already?
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

// Return whether array begins with the elements in prefix
// TODO: refactor into separate module, thought the starts-with module
// would do this but it doesn't? and String.prototype.startsWith is of course
// only for strings -- this is for arrays
function arrayStartsWith(array, prefix) {
  if (array.length < prefix.length) return false;

  for (var i = 0; i < prefix.length; ++i) {
    if (array[i] !== prefix[i]) return false;
  }

  return true;
}

function conforms(actual, expected, note) {
  if (mtypeof(expected) !== mtypeof(actual)) {
    throw new Error('value '+actual+
      (note ? ' of property "'+note+'" ' : ' ')+
      'expected '+mtypeof(expected)+', but got '+mtypeof(actual));
  }

  if (typeof(actual) === 'function') {
    var actualParams = functionToString(actual).params;
    var expectedParams = functionToString(expected).params;
    //console.log(actualParams,expectedParams);
    if (!arrayStartsWith(actualParams, expectedParams)) {
      throw new Error('value '+actual+
        (note ? ' of property "'+note+'" ' : ' ')+
        'expected function('+actualParams.join(',')+'), but got '+
        'function('+expectedParams.join(',')+')');
    }
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

  // TODO: isndarray?
  // TODO: allow undefined? typeof undefined === 'undefined'


  return true;
};

function nconforms(actual, expected) {
  var fail;
  try {
    conforms(actual, expected);
    fail = true;
  } catch (e) {
    return true;
  }

  if (fail) {
    throw new Error('unexpectedly conforms: '+actual+' to '+expected);
  }
};

module.exports = conforms;
module.exports.nconforms = nconforms;
