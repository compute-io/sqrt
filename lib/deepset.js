'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( arr, path[, sep] )
*	Computes an element-wise principal square root for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function sqrt( x, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		i;

	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			dset( x[i], SQRT( dget( x[i] ) ) );
		}
	}
	return x;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
