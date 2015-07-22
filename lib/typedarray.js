'use strict';

// MODULES //

var SQRT = require( './number.js' );


// SQUARE ROOT //

/**
* FUNCTION: sqrt( out, arr )
*	Computes an element-wise principal square root.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function sqrt( out, arr ) {
	var len = arr.length,
		i;
	for ( i = 0; i < len; i++ ) {
		out[ i ] = SQRT( arr[ i ] );
	}
	return out;
} // end FUNCTION sqrt()


// EXPORTS //

module.exports = sqrt;
