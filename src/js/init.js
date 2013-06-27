/*! init.js 

	This script loader uses Modernizr.load syntax (an alias of yepnope).
	
	Documentation found at: 
		http://modernizr.com/docs/#load
		http://yepnopejs.com/
*/

Modernizr.load([
	// Load jQuery first
	{
		load: 'http://byuweb.github.io/Global-Assets/js/jquery-1.9.1.min.js',
		complete: function () {
			if ( !window.jQuery ) {
				Modernizr.load('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js');
			}
		}
	},
	// Load scripts required by jQuery second. Load fonts script only if web fonts are supported
	{
		test: Modernizr.touch,
		nope: "js/script.min.js",
		yep: 'js/script-touch.min.js'
	},
	// Load fonts if fonts are supported
	{
		test : Modernizr.fontface,
		yep : "js/fonts.min.js"
	}
	
]);
