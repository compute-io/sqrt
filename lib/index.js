'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var sqrt1 = require( './number.js' ),
	sqrt2 = require( './array.js' ),
	sqrt3 = require( './accessor.js' ),
	sqrt4 = require( './deepset.js' ),
	sqrt5 = require( './matrix.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( x[, opts] )
*	Computes an element-wise principal square root.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix|Null} square root(s) or null
*/
function sqrt( x, options ) {
	var opts = {},
		err,
		out;

	if ( isNumber( x ) ) {
		return sqrt1( x );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		// TODO: flesh out
		// TODO: validate same shape
		// TODO: create output matrix with correct type, etc.
		return sqrt5( x );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( typeof x === 'object' ) {

		}
		else {
			out = new Array( x.length );
		}
		if ( opts.deepset ) {
			return sqrt4( out, x, opts.path, opts.sep );
		}
		else if ( opts.accessor ) {
			return sqrt3( out, x, opts.accessor );
		}
		return sqrt2( out, x );
	}
	throw new TypeError( 'sqrt()::invalid input argument. Input value type not currently supported. Value: `' + x + '`.' );
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
