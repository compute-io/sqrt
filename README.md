Square Root
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise principal [square root](https://en.wikipedia.org/wiki/Square_root).

The principal [square root](https://en.wikipedia.org/wiki/Square_root) is defined as

<div class="equation" align="center" data-raw-text="\sqrt{x^2} = \begin{matrix} x, &amp; \textrm{if}\ x \geq 0\end{matrix}" data-equation="eq:principal_square_root">
	<img src="https://cdn.rawgit.com/compute-io/sqrt/2c4684327c7729901d18ad030485c592d44a2f81/docs/img/eqn.svg" alt="Equation for the principal square root.">
	<br>
</div>

For negative numbers, the principal [square root](https://en.wikipedia.org/wiki/Square_root) is __not__ defined.



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

Computes an element-wise principal [square root](https://en.wikipedia.org/wiki/Square_root). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = sqrt( 9 );
// returns 3

out = sqrt( -9 );
// returns NaN

data = [ 4, 9, 16 ];
out = sqrt( data );
// returns [ 2, 3, 4 ]

data = new Int8Array( data );
out = sqrt( data );
// returns Float64Array( [2,3,4] )

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i*i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   4  9
	  16 25 ]
*/

out = sqrt( mat );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,4],
	[1,9],
	[2,16],
	[3,25],
	[4,36]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = sqrt( data, {
	'accessor': getValue
});
// returns [ 2, 3, 4, 5, 6 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,4]},
	{'x':[1,9]},
	{'x':[2,16]},
	{'x':[3,25]},
	{'x':[4,36]}
];

var out = sqrt( data, 'x|1', '|' );
/*
	[
		{'x':[0,2]},
		{'x':[1,3]},
		{'x':[2,4]},
		{'x':[3,5]},
		{'x':[4,6]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [4,9,16] );

out = sqrt( data, {
	'dtype': 'int32'
});
// returns Int32Array( [2,3,4] )

// Works for plain arrays, as well...
out = sqrt( [4,9,16], {
	'dtype': 'uint8'
});
// returns Uint8Array( [2,3,4] )
```

By default, the function returns a new data structure. To mutate the input data structure, set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 4, 9, 16 ];

out = sqrt( data, {
	'copy': false
});
// returns [ 2, 3, 4 ]

bool = ( data === out );
// returns true

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i*i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   4  9
	  16 25 ]
*/

out = sqrt( mat, {
	'copy': false
});
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

bool = ( mat === out );
// returns true
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
