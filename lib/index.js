'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isNumber = require( 'validate.io-number-primitive' );


// VARIABLES //

var SQRT = Math.sqrt;


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
function sqrt( x, opts ) {
	var copy = true,
		clbk,
		len,
		out,
		i;

	if ( isNumber( x ) ) {
		return SQRT( x );
	}
	if ( !isArray( x ) ) {
		throw new TypeError( 'sqrt()::invalid input argument. Must provide an array. Value: `' + x + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'sqrt()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'sqrt()::invalid option. Copy option must be a boolean. Option: `' + copy + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'sqrt()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}
	len = x.length;
	if ( copy ) {
		out = new Array( len );
	} else {
		out = x;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			out[ i ] = SQRT( clbk( x[ i ], i ) );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out[ i ] = SQRT( x[ i ] );
		}
	}
	return out;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
