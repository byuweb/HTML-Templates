/* touch.js */

$(function() {
	//FastClick.attach(document.body);

	document.addEventListener('touchmove', function(e) {
	    e.preventDefault();
	    var touch = e.touches[0];
	    //log(touch.pageX + " / " + touch.pageY);
	}, false);

	$('body').on('swipeleft', function(e){
		log('Swipe left');
	});
	$(window).on('swiperight', function(e){
		log('Swipe right');
	});

	$(window).on('movestart', function(e) {
		log('movestart');
		// If the movestart is heading off in an upwards or downwards
		// direction, prevent it so that the browser scrolls normally.
		if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
			
			e.preventDefault();
		}
	});

});

