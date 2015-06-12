/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

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

	it( 'should throw an error if the first argument is neither a number or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				sqrt( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option' );

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
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

	it( 'should compute the principal square root when provided a number', function test() {
		assert.strictEqual( sqrt( 9 ), 3 );
		assert.strictEqual( sqrt( 25 ), 5 );
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

	it( 'should compute an element-wise principal square root and deep set' );

	it( 'should compute an element-wise principal square root when provided a matrix' );

	it( 'should return `null` if provided an empty data structure', function test() {
		assert.isNull( sqrt( [] ) );
		assert.isNull( sqrt( matrix( [0,0] ) ) );
		assert.isNull( sqrt( new Int8Array() ) );
	});

});
