'use strict';

// MODULES //

var SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( out, x )
*	Computes an element-wise principal square root.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function sqrt( out, x ) {
	var len = x.length,
		i;
	if ( out.length !== len ) {
		throw new Error( 'sqrt()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = SQRT( x.data[ i ] );
	}
	return out;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
