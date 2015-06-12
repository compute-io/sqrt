'use strict';

// MODULES //

var SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( out, matrix )
*	Computes an element-wise principal square root for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix|Null} output matrix or null
*/
function sqrt( y, x ) {
	var len = x.length,
		i;
	if ( !len ) {
		return null;
	}
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
