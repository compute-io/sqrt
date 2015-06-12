/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	sqrt = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix sqrt', function tests() {

	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Int16Array( 25 );
	d2 = new Int16Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i*i;
		d2[ i ] = i;
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'int16' );
		out = matrix( d2, [5,5], 'int16' );
	});

	it( 'should export a function', function test() {
		expect( sqrt ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			sqrt( matrix( [10,10] ), mat );
		}
	});

	it( 'should compute the principal square root for each matrix element', function test() {
		var actual;

		actual = matrix( [5,5], 'int16' );
		actual = sqrt( actual, mat );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return null if provided an empty matrix', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( sqrt( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( sqrt( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( sqrt( out, mat ) );
	});

});
