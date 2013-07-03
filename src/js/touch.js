/*! 

* @fileOverview Touch.js
* @version 1.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/touch.js
*/


$(function() {
	//FastClick.attach(document.body);

	var body = $('body');

	//Enable swiping...
	$("#main-header, #search-menu, #content, #page-footer, .nav-container").swipe( {

		
		// Swipe left: close the side nav if it's open
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			if( body.hasClass('sideNav') ) {
				body.toggleClass('sideNav');
			}
		},

		// Swipe right: open the side nav if it's closed
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			if( !body.hasClass('sideNav') ) {
				body.toggleClass('sideNav');
			}
		},

		//Default is 75px, set to 0 for demo so any distance triggers swipe
		 threshold:50
	});

});

