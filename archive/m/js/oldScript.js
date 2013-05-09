
var byu_template = (function ($) {

	var clickOpened = false;

	$(function () {
		//activateMenus();
		loadImages();

		if (!Modernizr.borderradius) {
			var searchButton = $('#search-button');
			searchButton.attr('src', 'template/img/search-button.png');
			searchButton.css('display', 'inline');
			$('#search').css('margin-right', '24px');
		}

		$(window).resize(positionFooter);
		positionFooter();
	});

	function positionFooter() {
		$('#content').css('minHeight', ($(window).height() - $('header').height() - $('footer').height() - 50) + 'px');
	}

	function loadImages() {
		$('span.img').each(function () {
			var span = $(this);
			var url = span.removeClass('img').attr('data-src');
			var alt = span.attr('data-alt');
			span.replaceWith('<img src="' + url + '" alt="' + alt + '" />');
		});
	}

	function activateMenus() {
		$('nav li:has(.mega, .sub) > a').click(function (e) {
			e.preventDefault();
			var li = $(this).parent();
			// Only close menu if user clicked to open it
			if (li.hasClass('hover') && clickOpened) {
				li.removeClass('hover');
			}
			else {
				li.addClass('hover');
				$('nav li').not(li).removeClass('hover');
				clickOpened = true;
			}
			return false;
		});

		$('nav li:has(.mega, .sub)').click(function (e) {
			e.stopPropagation();
		});

		// Menu config
		var byuMenuConfig = {
			sensitivity: 10,
			interval: 75,
			over: rollOver, // function = onMouseOver callback (REQUIRED)    
			timeout: 350, // number = milliseconds delay before onMouseOut    
			out: rollOut // function = onMouseOut callback (REQUIRED)    
		};
		$('#secondary-nav > ul > li, #primary-nav > ul > li').hoverIntent(byuMenuConfig);
		$('nav.no-js').removeClass('no-js');

		/* Positions menu divs */
		$('nav li .sub').each(function () {
			var mega = $(this);
			var left = mega.parent().position().left;
			if (left > mega.parent().parent().outerWidth() - mega.outerWidth()) {
				mega.css('right', 0);
			}
		});
	}

	/* Func: RollOver
	* Desc: Show a dropdown menu on rollover. Called by the hoverIntent function.

	* Args: @evt	- Event object. Automatically generated.
	*/
	function rollOver(evt) {

		if (!$(this).hasClass('hover')) {
			clickOpened = false;
			$(this).addClass('hover');
			$('nav li').not(this).removeClass('hover');
			$(document).click(hideAllMenus);
		}
		//if(evt !== undefined) evt.stopPropagation();
	}

	/* Func: RollOut
	* Desc: Hide a dropdown menu on rollout. Called by the hoverIntent function.
	* Args: -
	*/
	function rollOut() {
		$(this).removeClass('hover');
	}

	/* Func: HideAllMenus
	* Desc: Hide all dropdown menus. Bound to click action.
	* Args: -
	*/
	function hideAllMenus() {
		$('nav li').removeClass('hover');
		$(document).unbind('click');
}

})(jQuery);











/*********** PLUGINS **************/


/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*	interval: 100,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
	};
})(jQuery);