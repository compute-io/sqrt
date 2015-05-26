'use strict';

// MODULES //

var SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( out, arr )
*	Computes an element-wise principal square root for each array element.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @returns {Array} output array
*/
function sqrt( y, x ) {
	var len = x.length,
		i;

	for ( i = 0; i < len; i++ ) {
		y[ i ] = SQRT( x[ i ] );
	}
	return y;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
