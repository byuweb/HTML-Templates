/*! 

* @fileOverview Script.js
* @version 2.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/script.js
*/


var byu_template = (function ($) {

   "use strict";

	var clickOpened = false;

	// Document ready - Execute on page load
	$( function () {

		var w = $(window).width();
		//log( 'Initial window width: ' + w + 'px' );

		// Execute menu activation and search load only after window width exceeds 250px
		executeAfterBreakpoint( [ activateMenus, loadSearch ], 256);
	});






	/* Func: ActivateMenus
	 * Desc: Get the menus going
	 * Args: none
	 */
	function activateMenus() {
		$('#search-menu').delegate('.menu-button', 'click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			$('body').toggleClass('sideNav');
		});

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

		/* Positions menu divs */
		$('nav li .sub').each(function () {
			var mega = $(this);
			var left = mega.parent().position().left;
			if (left > mega.parent().parent().outerWidth() - mega.outerWidth()) {
				mega.css('right', 0);
			}
		});

		//Listener for if screen is resized to close sideNav
		$(window).resize(function (){
			if ($(window).width() > 768){
				$('body').removeClass('sideNav');
			} else if ($(window).width() < 768 && $(".hover")[0]){
				$("body").addClass("sideNav");
			}
		});

		$("body").click(function(){
			$(".hover").removeClass("hover");
		}); 
		
		$("#content").click(function(){
			$("body").removeClass("sideNav");
		});

	}



	/* Func: loadSearch
	 * Desc: Load the Google Custom Search
	 * Args: none
	 */
	function loadSearch(){

		// Check for settings, set default if absent
		if ( typeof window.pageSettings == 'undefined') {
			window.pageSettings = {};
		}
		if ( typeof window.pageSettings.gcse_search == 'undefined' || typeof window.pageSettings.gcse_search_id == 'undefined' ) {
			window.pageSettings.gcse_search = false;
		}


		// Run the GCSE search script if set to do so
		if ( window.pageSettings.gcse_search === true ) {

			window.__gcse = {
				callback: function() {
						if (document.readyState == 'complete') {
						// CSE has successfully loaded. Go ahead and hide the basic search.
							$("#basic-search").hide();
						}
					}
			};

			(function() {
				var cx = window.pageSettings.gcse_search_id; // Insert your own Custom Search engine ID here
				var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
				gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(gcse, s);
			})();

		}

	}



}(jQuery));