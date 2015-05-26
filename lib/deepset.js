'use strict';

// MODULES //

var SQRT = require( './number.js' ),
	deepSet = require( 'utils-deep-set' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( out, arr, path, accessor )
*	Computes an element-wise principal square root for each array element.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {String} path - key path used when deep setting
* @param {Function} accessor - accessor function for accessing array values
* @returns {Array} output array
*/
function sqrt( y, x, path, clbk ) {
	var len = x.length,
		i;

	for ( i = 0; i < len; i++ ) {
		deepSet( y[i], path, SQRT( clbk( x[i], i ) ) );
	}
	return y;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
