'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

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

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				5,
				'5',
				{},
				true,
				null,
				undefined,
				NaN,
				function(){}
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

	it( 'should compute an element-wise principal square root', function test() {
		var data, expected;

		data = [ 1, 4, 9, 16, 25 ];
		expected = [ 1, 2, 3, 4, 5 ];

		sqrt( data );
		assert.deepEqual( data, expected );
	});

});
