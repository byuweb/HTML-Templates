/*! 

* @fileOverview Touch.js
* @version 1.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/touch.js
*/


(function ($) {

	"use strict";


	// Document ready - Execute on page load
	$(function() {

		var body = $('body'),
				width = $(window).width(),
				swipewidth = Math.floor(width * 0.16);

		if( swipewidth > 150 ) {
			swipewidth = 150;
		}

		if( swipewidth < 50 ) {
			swipewidth = 50;
		}

		//Enable swiping...
		$("#main-header, #search-menu, #content, #page-footer, .nav-container").swipe( {

			
			// Swipe left: close the side nav if it's open
			swipeLeft:function(event, direction, distance, duration, fingerCount) {

				var slider = checkSliderSwipe(event.target, direction);

				if( !slider && body.hasClass('sideNav') ) {
					body.toggleClass('sideNav');
				}
			},

			// Swipe right: open the side nav if it's closed
			swipeRight:function(event, direction, distance, duration, fingerCount) {
				
				var slider = checkSliderSwipe(event.target, direction);

				if( slider ) {

				}

				if( !slider && !body.hasClass('sideNav') ) {
					body.toggleClass('sideNav');
				}
			},

			// Will trigger as soon as swipewidth is reached rather than waiting until the end of the swipe
			triggerOnTouchEnd:false,

			// Default is 75px. Set to swipewidth (defined above)
			threshold:swipewidth
		});


	});


	/* Func: checkSliderSwipe
	 * Desc: If the anythingSlider is there, apply the swipe to that. If it's successful, return true.
	 * Args: @target - Target of swipe event (event.target)
	 *       @direction - Direction passed from swipe functions above
	 */
	function checkSliderSwipe(target, direction) {

		var sliderLoaded = typeof($.anythingSlider) === "function",
			sliderSwipe = sliderLoaded && $(target).closest('.anythingSlider').size(),
			sliderTargetID,
			sliderTarget;

		if ( !sliderSwipe ) {
			return false;
		}
		
		sliderTargetID = $(target).closest('.anythingSlider').find('.anythingBase').attr('id');
		sliderTarget = $('#' + sliderTargetID);

		if( direction === 'right' ){
			sliderTarget.data('AnythingSlider').goBack();
		} 
		else {
			sliderTarget.data('AnythingSlider').goForward();
		}

		return true;
	}


}(jQuery));

