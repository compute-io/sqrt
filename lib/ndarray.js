'use strict';

// MODULES //

var SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( out, arr )
*	Computes an element-wise principal square root for each array element.
*
* @param {ndarray} out - output ndarray
* @param {ndarray} arr - input ndarray
* @returns {ndarray} output array
*/
function sqrt( y, x ) {
	var out = y,
		len,
		i;

	x = x.data;
	y = y.data;
	len = x.length;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = SQRT( x[ i ] );
	}
	return out;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
