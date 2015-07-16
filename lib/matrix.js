'use strict';

// MODULES //

var SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( y, x )
*	Computes an element-wise principal square root.
*
* @param {Matrix} y - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function sqrt( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'sqrt()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = SQRT( x.data[ i ] );
	}
	return y;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
