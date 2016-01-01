'use strict';

var createInterface = function(obj) { // can't use 'interface', reserved JavaScript word :(
};

var conforms = function(obj, iface) {
};

var duck = createInterface({
  quack: function() {},
});

console.log(conforms({}, duck));
console.log(conforms({quack: 1}, duck));
console.log(conforms({quack: function() { console.log('quack'); }}, duck));

