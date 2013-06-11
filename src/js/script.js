/*! 
  Script.js 
*/

//Document ready
$(function(){
  activateMenus();
  loadSearch();
});



/* Func: ActivateMenus
 * Desc: Get the menus going
 * Args: none
 */
function activateMenus() {
  $('#header-top').append('<a href="#" class="menu-button">Menu</a>');
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
* Loads the Google Custom Search
*/
function loadSearch(){
		window.__gcse = {
		parsetags: 'explicit',
		callback: hideSearch
		};
	  
		(function() {		
 			var cx = '009932716493032633443:hlqjz33kfkc';
			var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
			gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
				'//www.google.com/cse/cse.js?cx=' + cx;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(gcse, s);
 		})();
}

/** Func: SetPrimaryNavPosition
 * Desc: Move the nav around so it works in the sidebar
 * Args: none
 */
function setupNavPosition() {
  $('#main-header').append('<div class="nav-container"></div>');
  $('#secondary-nav, #primary-nav').detach().appendTo('.nav-container');
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

/**
 * function set display to none if the Google CSE loads via jQuery
 */
function hideSearch() {
	$('#basic-search').hide();
}