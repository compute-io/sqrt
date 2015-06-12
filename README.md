Square Root
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise principal square root.


## Installation

``` bash
$ npm install compute-sqrt
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var sqrt = require( 'compute-sqrt' );
```

#### sqrt( x[, opts] )

Computes an element-wise principal square root. The function accepts as its first argument either a single `numeric` value or an `array`. For an input `array`, the square root is computed for each value.

``` javascript
var out = sqrt( 9 );
// returns 3

out = sqrt( [ 4, 9, 16 ] );
// returns [ 2, 3, 4 ]
```

When provided an input `array`, the function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the square root values. Default: `true`.
*  __accessor__: accessor `function` for accessing numeric values in object `arrays`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [ 4, 9, 16 ];

var out = sqrt( arr, {
	'copy': false
});
// returns [ 2, 3, 4 ]

console.log( arr === out );
// returns true
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 4],
	['boop', 9],
	['bip', 16],
	['bap', 25],
	['baz', 36]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = sqrt( data, {
	'accessor': getValue
});
// returns [ 2, 3, 4, 5, 6 ]
```




## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	sqrt = require( 'compute-sqrt' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*1000 );
}
out = sqrt( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = sqrt( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = sqrt( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
out = sqrt( data );

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = sqrt( mat );

// Matrices (custom output data type)...
out = sqrt( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-sqrt.svg
[npm-url]: https://npmjs.org/package/compute-sqrt

[travis-image]: http://img.shields.io/travis/compute-io/sqrt/master.svg
[travis-url]: https://travis-ci.org/compute-io/sqrt

[coveralls-image]: https://img.shields.io/coveralls/compute-io/sqrt/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/sqrt?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/sqrt.svg
[dependencies-url]: https://david-dm.org/compute-io/sqrt

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/sqrt.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/sqrt

[github-issues-image]: http://img.shields.io/github/issues/compute-io/sqrt.svg
[github-issues-url]: https://github.com/compute-io/sqrt/issues
