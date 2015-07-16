/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	sqrt = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-sqrt', function tests() {

	it( 'should export a function', function test() {
		expect( sqrt ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				sqrt( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				sqrt( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				sqrt( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				sqrt( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( sqrt( values[ i ] ) ) );
		}
	});

	it( 'should compute the principal square root when provided a number', function test() {
		assert.strictEqual( sqrt( 9 ), 3 );
		assert.strictEqual( sqrt( 25 ), 5 );

		assert.isTrue( isnan( sqrt( NaN ) ) );
	});

	it( 'should compute an element-wise principal square root when provided a plain array', function test() {
		var data, actual, expected;

		data = [ 1, 4, 9, 16, 25 ];
		expected = [ 1, 2, 3, 4, 5 ];

		actual = sqrt( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = sqrt( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute an element-wise principal square root when provided a typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 1, 4, 9, 16, 25 ] );
		expected = new Float64Array( [ 1, 2, 3, 4, 5 ] );

		actual = sqrt( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = sqrt( data, {
			'copy': false
		});
		expected = new Int8Array( [ 1, 2, 3, 4, 5 ] );
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute an element-wise principal square root and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 1, 4, 9, 16, 25 ];
		expected = new Int8Array( [ 1, 2, 3, 4, 5 ] );

		actual = sqrt( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute an element-wise principal square root using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,1],
			[1,4],
			[2,9],
			[3,16],
			[4,25]
		];
		expected = [ 1, 2, 3, 4, 5 ];

		actual = sqrt( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = sqrt( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should compute an element-wise principal square root and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[0,1]},
			{'x':[1,4]},
			{'x':[2,9]},
			{'x':[3,16]},
			{'x':[4,25]}
		];
		expected = [
			{'x':[0,1]},
			{'x':[1,2]},
			{'x':[2,3]},
			{'x':[3,4]},
			{'x':[4,5]}
		];

		actual = sqrt( data, {
			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[0,1]},
			{'x':[1,4]},
			{'x':[2,9]},
			{'x':[3,16]},
			{'x':[4,25]}
		];

		actual = sqrt( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute an element-wise principal square root when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int16Array( 25 );
		d2 = new Float64Array( 25 );
		d3 = new Int16Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i*i;
			d2[ i ] = i;
			d3[ i ] = i;
		}
		mat = matrix( d1, [5,5], 'int16' );
		out = sqrt( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = sqrt( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should compute an element-wise principal square root and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i*i;
			d2[ i ] = i;
		}
		mat = matrix( d1, [5,5], 'int16' );
		out = sqrt( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( sqrt( [] ), [] );
		assert.deepEqual( sqrt( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( sqrt( new Int8Array() ), new Float64Array() );
	});

});
