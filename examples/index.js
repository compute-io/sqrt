'use strict';

var sqrt = require( './../lib' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*1000 );
}
var out = sqrt( data );

console.log( out.join( '\n' ) );
