/**
*
*	COMPUTE: sqrt
*
*
*	DESCRIPTION:
*		- Computes an element-wise square root for each element in a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// SQUARE ROOT //

/**
* FUNCTION: sqrt( arr )
*	Computes an element-wise square root for each element of a numeric array. Note: the input array is mutated.
*
* @param {Array} arr - numeric array
*/
function sqrt( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'sqrt()::invalid input argument. Must provide an array.' );
	}
	var len = arr.length;
	for ( var i = 0; i < len; i++ ) {
		arr[ i ] = Math.sqrt( arr[ i ] );
	}
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
