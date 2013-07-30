/*! 

* @fileOverview Script.js
* @version 2.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/script.js
*/


(function () {

   "use strict";

	var clickOpened = false;
	var scriptsActivated = false;
	var activationSizeThreshold = 250;


	// Document ready - Execute on page load
	$( function () {

		var w = $(window).width();
		log( 'Initial window width: ' + w + 'px' );

		if( w > activationSizeThreshold ) {
			activateScripts();
		} 
		else {
			$(window).resize( checkActivation );
		}
	});





	/* Func: checkActivation
	 * Desc: Check to see if search and menus have been activated, and activate them if needed
	 * Args: none
	 */
	function checkActivation() {
		
		// If the scripts have not been activated, and the size threshold has been crossed
		if( !scriptsActivated && $(window).width() > activationSizeThreshold ) {

			// Activate the scripts
			activateScripts();

			// Turn off the resize checking
			$(window).off('resize', checkActivation);
		}

	}





	/* Func: activateScript
	 * Desc: Activate the search and menu scripts
	 * Args: none
	 */
	function activateScripts() {
		
		activateMenus();
		loadSearch();

		scriptsActivated = true;
	}




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
		window.__gcse = {
				callback: hideSearch
		};

		(function() {
			var cx = '009932716493032633443:hlqjz33kfkc';
			var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
			gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(gcse, s);
		})();
	}




	/* Func: hideSearch
	 * Desc: Hide basic search if the Google CSE loads
	 * Args: none
	 */
	var hideSearch = function() {
		if (document.readyState == 'complete') {
			// CSE has successfully loaded. Go ahead and hide the basic search.
	    $("#basic-search").hide();
	  }
	};



}());