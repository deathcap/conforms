'use strict';

module.exports = function(obj, iface) {
  var keys = Object.keys(iface);
  for (var i = 0; i < keys.length; ++i) {
    var name = keys[i];
    var expected = iface[name];

    if (!(name in obj)) {
      throw new Error('object is missing property: "'+name+'": '+obj);
    }

    var actual = obj[name];

    if (typeof expected !== typeof actual) {
      throw new Error('object property "'+name+'" expected '+typeof expected+', but got '+typeof actual);
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

    // TODO: other object subtypes? could get arbitrarily complex, recursive?
    // TODO: integers vs floats?
    // TODO: allow undefined? typeof undefined === 'undefined'


  }

  return true;
};
