/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	sqrt = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number sqrt', function tests() {

	it( 'should export a function', function test() {
		expect( sqrt ).to.be.a( 'function' );
	});

	it( 'should compute the principal square root', function test() {
		assert.strictEqual( sqrt( 9 ), 3 );
		assert.strictEqual( sqrt( 900 ), 30 );
		assert.strictEqual( sqrt( 81 ), 9 );
	});

});
