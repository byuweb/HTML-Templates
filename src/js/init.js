/*! init.js 

	This script loader uses Modernizr.load syntax (an alias of yepnope).
	
	Documentation found at: 
		http://modernizr.com/docs/#load
		http://yepnopejs.com/
*/

(function () {

	"use strict";

	Modernizr.load([

		// Load jQuery first. If it doesn't make it from our location, get it from Google.
		{
			load: 'http://byuweb.github.io/Global-Assets/js/jquery-1.9.1.min.js',
			complete: function () {
				if ( !window.jQuery ) {
					Modernizr.load('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js');
				}
			}
		},
		
		// Next load scripts that require jQuery. If touch is enabled, load alternate script file with touch support added.
		{
			test: Modernizr.touch,
			nope: "js/script.min.js",
			yep: 'js/script-touch.min.js'
		},

		// If the variable "loadslider" is truthy, load the slider script
		{
			test: loadslider,
			yep: "js/slider.min.js"
		},

		// If fonts are supported and the browser window is 600px wide or more, load the fonts
		{
			test : Modernizr.fontface && Modernizr.mq( 'only all and (min-width: 600px)' ),
			yep : "js/fonts.min.js"
		}
	]);

}());