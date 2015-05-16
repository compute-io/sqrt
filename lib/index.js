'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// VARIABLES //

var SQRT = Math.sqrt;


// SQUARE ROOT //

/**
* FUNCTION: sqrt( arr[, opts] )
*	Computes an element-wise principal square root.
*
* @param {Array} arr - input array
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number[]|Null} output array or null
*/
function sqrt( arr, opts ) {
	var copy = true,
		clbk,
		len,
		out,
		i;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'sqrt()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
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
	len = arr.length;
	if ( copy ) {
		out = new Array( len );
	} else {
		out = arr;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			out[ i ] = SQRT( clbk( arr[ i ], i ) );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out[ i ] = SQRT( arr[ i ] );
		}
	}
	return out;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
