'use strict';

var sqrt = require( './../lib' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*1000 );
}

sqrt( data );

console.log( data.join( '\n' ) );
