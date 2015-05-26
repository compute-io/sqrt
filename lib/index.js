'use strict';

// MODULES //

var copy = require( 'utils-copy' ),
	isArray = require( 'validate.io-array' ),
	isNumber = require( 'validate.io-number-primitive' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var sqrt1 = require( './number.js' ),
	sqrt2 = require( './array.js' ),
	sqrt3 = require( './accessor.js' ),
	sqrt4 = require( './deepset.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( x[, opts] )
*	Computes an element-wise principal square root.
*
* @param {Number|Number[]|Array} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number|Number[]|Null} output array or null
*/
function sqrt( x, options ) {
	var opts,
		err,
		out;

	if ( isNumber( x ) ) {
		return sqrt1( x );
	}
	if ( arguments.length > 1 ) {
		opts = copy( options );
		err = validate( opts );
		if ( err ) {
			throw err;
		}
	}
	if ( isArray( x ) ) {
		if ( !x.length ) {
			return null;
		}
		if ( opts.deepset ) {
			out = x;
		}
		else if ( opts.copy ) {
			out = new Array( x.length );
		}
		else {
			out = x;
		}
		if ( opts.deepset ) {
			out = sqrt4( out, x, opts.path, opts.accessor, opts.sep );
		}
		else if ( opts.accessor ) {
			out = sqrt3( out, x, opts.accessor );
		}
		else {
			out = sqrt2( out, x );
		}
	} else {
		throw new TypeError( 'sqrt()::invalid input argument. Input value type not currently supported. Value: `' + x + '`.' );
	}
	return out;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
