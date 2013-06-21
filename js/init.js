/*! init.js */

Modernizr.load([
	{
		load: 'http://byuweb.github.io/Global-Assets/js/jquery-1.9.1.min.js',
		complete: function () {
			if ( !window.jQuery ) {
				Modernizr.load('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js');
			}
		}
	},

	{
		test : Modernizr.fontface,
		yep : "js/fonts.min.js",
		both: "js/script.min.js"
	},
]);