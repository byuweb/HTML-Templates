/*! 

* @fileOverview fonts.js
* @version 1.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/fonts.js
*/



(function () {

	"use strict";

	function progress(message) {
		var output = document.getElementById('events');
		if (output) {
			var e = document.createElement('li');
			e.innerHTML = message;
			output.appendChild(e);
		}
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	}


	WebFont.load({
		custom: {
			families: ['OpenSans:n4,i4,n5,i5'],
			urls : ['css/fonts.css']
		},
	/*  
		loading: function() {
			progress('loading');
		},
		active: function() {
			progress('active');
		},
		inactive: function() {
			progress('inactive');
		},
	*/
		fontloading: function(fontFamily, fontDescription) {
			progress('fontloading: ' + fontFamily + ' (' + fontDescription + ')');
		},
		fontactive: function(fontFamily, fontDescription) {
			progress('fontactive: ' + fontFamily + ' (' + fontDescription + ')');
		},
		fontinactive: function(fontFamily, fontDescription) {
			progress('fontinactive: ' + fontFamily + ' (' + fontDescription + ')');
		}
	});

	WebFont.load({
		custom: {
			families: ['CreteRound:n4,i4'],
			urls : ['css/fonts.css']
		},
		fontloading: function(fontFamily, fontDescription) {
			progress('fontloading: ' + fontFamily + ' (' + fontDescription + ')');
		},
		fontactive: function(fontFamily, fontDescription) {
			progress('fontactive: ' + fontFamily + ' (' + fontDescription + ')');
		},
		fontinactive: function(fontFamily, fontDescription) {
			progress('fontinactive: ' + fontFamily + ' (' + fontDescription + ')');
		}
	});

	WebFont.load({
		custom: {
			families: ['DroidSerif:n4'],
			urls : ['css/fonts.css']
		},
		fontloading: function(fontFamily, fontDescription) {
			progress('fontloading: ' + fontFamily + ' (' + fontDescription + ')');
		},
		fontactive: function(fontFamily, fontDescription) {
			progress('fontactive: ' + fontFamily + ' (' + fontDescription + ')');
		},
		fontinactive: function(fontFamily, fontDescription) {
			progress('fontinactive: ' + fontFamily + ' (' + fontDescription + ')');
		}
	});



	// WebFont.load({
	//   custom: {
	//     families: ['FontAwesome'],
	//     urls : ['css/fonts.css']
	//   },
	//   timeout:2500,
	//   fontloading: function(fontFamily, fontDescription) {
	//     progress('fontloading: ' + fontFamily + ' (' + fontDescription + ')');
	//   },
	//   fontactive: function(fontFamily, fontDescription) {
	//     progress('fontactive: ' + fontFamily + ' (' + fontDescription + ')');
	//   },
	//   fontinactive: function(fontFamily, fontDescription) {
	//     progress('fontinactive: ' + fontFamily + ' (' + fontDescription + ')');
	//   }
	// });

}());
