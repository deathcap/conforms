'use strict';

var conforms = function(obj, iface) {
  var keys = Object.keys(iface);
  for (var i = 0; i < keys.length; ++i) {
    var name = keys[i];
    var expected = iface[name];

    if (!(name in obj)) {
      throw new Error('object is missing property: '+name+': '+obj);
    }

    var actual = obj[name];

    // TODO: arrays ([] is object)
    // TODO: allow undefined? typeof undefined === 'undefined'
    if (typeof expected !== typeof actual) {
      throw new Error('object property '+name+' is of type '+typeof actual+', but expected '+typeof expected);
    }
  }
};

var duck = {
  quack: function() {},
};

//console.log(conforms({}, duck));
console.log(conforms({quack: 1}, duck));
console.log(conforms({quack: function() { console.log('quack'); }}, duck));

