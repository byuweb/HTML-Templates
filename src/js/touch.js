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

	var body = $('body'),
			width = $(window).width(),
			swipewidth = Math.floor(width * .16);

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

		// Will trigger as soon as 50px is reached
		triggerOnTouchEnd:false,

		// Default is 75px, set to 0 for demo so any distance triggers swipe
		 threshold:swipewidth
	});

	// If a slider is present, enable swipe events
	if( typeof($.anythingSlider) == 'function') {
		$('#slider').anythingSlider({
		    // Callback when the plugin finished initializing
		    onInitialized: function(e, slider) {
		        setupSwipe(slider);
		    }
		});
	}
});


/******************************************
 Swipe Demo - without using jQuery Mobile
 ******************************************/
var setupSwipe = function(slider) {
    var time = 1000,
        // allow movement if < 1000 ms (1 sec)
        range = 50,
        // swipe movement of 50 pixels triggers the slider
        x = 0,
        t = 0,
        touch = "ontouchend" in document,
        st = (touch) ? 'touchstart' : 'mousedown',
        mv = (touch) ? 'touchmove' : 'mousemove',
        en = (touch) ? 'touchend' : 'mouseup';

    slider.$window
        .bind(st, function(e) {
            // prevent image drag (Firefox)
            e.preventDefault();
            t = (new Date()).getTime();
            x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        })
        .bind(en, function(e) {
            t = 0;
            x = 0;
        })
        .bind(mv, function(e) {
            e.preventDefault();
            var newx = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
                r = (x === 0) ? 0 : Math.abs(newx - x),
                // allow if movement < 1 sec
                ct = (new Date()).getTime();
            if (t !== 0 && ct - t < time && r > range) {
                if (newx < x) {
                    slider.goForward();
                }
                if (newx > x) {
                    slider.goBack();
                }
                t = 0;
                x = 0;
            }
        });
};


