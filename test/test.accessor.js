/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	sqrt = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor sqrt', function tests() {

	it( 'should export a function', function test() {
		expect( sqrt ).to.be.a( 'function' );
	});

	it( 'should compute the principal square root using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':4},
			{'x':0},
			{'x':9},
			{'x':100},
			{'x':81},
			{'x':16}
		];
		actual = new Array( data.length );

		actual = sqrt( actual, data, getValue );
		expected = [ 2, 0, 3, 10, 9, 4 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( sqrt( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = sqrt( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
