/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	sqrt = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset sqrt', function tests() {

	it( 'should export a function', function test() {
		expect( sqrt ).to.be.a( 'function' );
	});

	it( 'should compute the principal square root and deep set', function test() {
		var data, expected;

		data = [
			{'x':4},
			{'x':0},
			{'x':9},
			{'x':100},
			{'x':81},
			{'x':16}
		];

		data = sqrt( data, 'x' );
		expected = [
			{'x':2},
			{'x':0},
			{'x':3},
			{'x':10},
			{'x':9},
			{'x':4}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,4]},
			{'x':[9,0]},
			{'x':[9,9]},
			{'x':[9,100]},
			{'x':[9,81]},
			{'x':[9,16]}
		];

		data = sqrt( data, 'x/1', '/' );
		expected = [
			{'x':[9,2]},
			{'x':[9,0]},
			{'x':[9,3]},
			{'x':[9,10]},
			{'x':[9,9]},
			{'x':[9,4]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( sqrt( [], 'x' ), [] );
		assert.deepEqual( sqrt( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = sqrt( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
