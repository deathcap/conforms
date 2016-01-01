# conforms

Usage:

    var conforms = require('conforms');

    conforms(actual, expected);

where `actual` is the value to validate, and `expected` is an
"interface" template describing the required properties and types.
Throws an exception if non-conformant, otherwise returns true. This
can be used to implement [duck typing](https://en.wikipedia.org/wiki/Duck_typing),
for example:

    var duck = { 
      quack: function(volume) {}, 
    };
  
    var obj = {quack: function(volume) { console.log('quack'); }};
  
    conforms(obj, duck); // returns true

`obj` is considered to conform to the `duck` interface because it has
all of the required properties: `quack` in this case is a method, with the appropriate parameter
names (`volume`, but extra parameters can exist without violating conformance). If another object
is passed without meeting these requirements, `conforms()` will throw an exception. 

## Interface specifications

The interface template (`expected`) is an actual value, not a type name, but only
the salient typing information is compared. This includes:

* The JavaScript type (using`typeof`)
* Integer/non-integer numbers (using `Number.isInteger`)
* Array/non-array objects (using `Array.isArray`)
* Recursing into (non-array) objects and checking conformance of each property (extra properties are allowed)
* Matching the function parameter names (names must be equal, but extra parameters are allowed)

For more examples, see `test.js`.

## License

MIT


