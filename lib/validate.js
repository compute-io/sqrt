'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// VALIDATE //

/**
* FUNCTION: validate( opts )
*	Validates function options. If an option is not present, a default option value is set.
*
* @param {Object} opts - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor=null] - accessor function for accessing array values
* @returns {Null|Error} null or an error
*/
function validate( opts ) {
	if ( !isObject( opts ) ) {
		return new TypeError( 'sqrt()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
	}
	if ( opts.hasOwnProperty( 'copy' ) && !isBoolean( opts.copy ) ) {
		return new TypeError( 'sqrt()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
	} else {
		opts.copy = true;
	}
	if ( opts.hasOwnProperty( 'accessor' ) && !isFunction( opts.accessor ) ) {
		return new TypeError( 'sqrt()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
	} else {
		opts.accessor = null;
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
