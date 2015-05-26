'use strict';

// MODULES //

var SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( out, arr, accessor )
*	Computes an element-wise principal square root for each array element using an accessor function.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Array} output array
*/
function sqrt( y, x, clbk ) {
	var len = x.length,
		i;

	for ( i = 0; i < len; i++ ) {
		y[ i ] = SQRT( clbk( x[ i ], i ) );
	}
	return y;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
