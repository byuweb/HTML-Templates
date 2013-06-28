// Global Variables
var init = false;
		small = 300,
		full_menu = 768,
		full = 1024,

		// Add breakpoints with jRespond
		jRes = jRespond([
    {
        label: 'tiny',
        enter: 0,
        exit: small - 1
    },
    {
        label: 'small',
        enter: small,
        exit: full_menu - 1
    },
    {
        label: 'full_menu',
        enter: full_menu,
        exit: full - 1
    },
    {
        label: 'full',
        enter: full,
        exit: 10000
    }
]);


// Document ready
$(function(){

	getWidth();
	$(window).resize(getWidth);

	loadSearch();


	jRes.addFunc({
		breakpoint: ['small', 'full_menu', 'full'],
		enter: function() {
			if( !init ) {
				init = true;
				activateMenus();
			}
		}
	});


});


/* Func: getWidth
 * Desc: Get the current width of the browser window
 * Args: none
 */
function getWidth() {
	var w = $(window).width();
	log(w);
	return w;
}


/* Func: ActivateMenus
 * Desc: Get the menus going
 * Args: none
 */
function activateMenus() {
	$('#header-top').delegate('.menu-button', 'click', function () {
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

	// Menu config
	var byuMenuConfig = {
		sensitivity: 10,
		interval: 75,
		over: rollOver, // function = onMouseOver callback (REQUIRED)
		timeout: 350, // number = milliseconds delay before onMouseOut
		out: rollOut // function = onMouseOut callback (REQUIRED)
	};
	//$('#secondary-nav > ul > li, #primary-nav > ul > li').hoverIntent(byuMenuConfig);
	$('nav.no-js').removeClass('no-js');

	/* Positions menu divs */
	$('nav li .sub').each(function () {
		var mega = $(this);
		var left = mega.parent().position().left;
		if (left > mega.parent().parent().outerWidth() - mega.outerWidth())
			mega.css('right', 0);
	});

//Listener for if screen is resized to close sideNav
$(window).resize(function (){
if ($(window).width() > 768){
	$('body').removeClass('sideNav');
}
});

}

/**
 * function set display to none if the Google CSE loads via jQuery
 */
function hideSearch() {
	$('#basic-search').hide();
}


/**
* Loads the Google Custom Search
*/
function loadSearch(){
		log('Load search');
		window.__gcse = {
			callback: hideSearch
		};

		(function() {
			var cx = '009932716493032633443:hlqjz33kfkc';
			var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
			gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
				'//www.google.com/cse/cse.js?cx=' + cx;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(gcse, s);
			hideSearch();
		})();
}


/** Func: SetPrimaryNavPosition
 * Desc: Move the nav around so it works in the sidebar
 * Args: none
 */
function setupNavPosition() {
	//$('#main-header').append('<div class="nav-container"></div>');
	//$('#secondary-nav, #primary-nav').detach().appendTo('.nav-container');
}


/** Func: RollOver
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
}

/** Func: RollOut
* Desc: Hide a dropdown menu on rollout. Called by the hoverIntent function.
* Args: -
*/
function rollOut() {
	$(this).removeClass('hover');
}

/** Func: HideAllMenus
* Desc: Hide all dropdown menus. Bound to click action.
* Args: -
*/
function hideAllMenus() {
	$('nav li').removeClass('hover');
	$(document).unbind('click');
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}




// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};
// catch all document.write() calls
(function(doc){var write=doc.write;doc.write=function(q){log('document.write():',arguments);if(/docwriteregexwhitelist/.test(q))write.apply(doc,arguments);};})(document);
