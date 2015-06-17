/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	sqrt = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array sqrt', function tests() {

	it( 'should export a function', function test() {
		expect( sqrt ).to.be.a( 'function' );
	});

	it( 'should compute the principal square root', function test() {
		var data, actual, expected;

		data = [ 4, 0, 9, 100, 81, 16 ];
		actual = new Array( data.length );

		actual = sqrt( actual, data );
		expected = [ 2, 0, 3, 10, 9, 4 ];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Float64Array( data.length );

		actual = sqrt( actual, data );
		expected = new Float64Array( expected );

		assert.deepEqual( actual, expected, 'typed arrays' );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( sqrt( [], [] ) );
		assert.isNull( sqrt( new Int8Array(), new Int8Array() ) );
	});

});
