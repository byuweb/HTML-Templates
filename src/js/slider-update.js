/*! 

* @fileOverview slider-update.js
* @version 1.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/slider-update.js
*/



 



(function ($) {

	"use strict";

	// On page Load
	$(function(){

		// Initialize slider only after window width exceeds 250px
		executeAfterBreakpoint( initializeSlider, 250 );

	});



	/* Func: initializeSlider
	 * Desc: Start the anythingSlider
	 * Args: none
	 */
	 function initializeSlider() {

		$('#slider').anythingSlider({
			mode                : "f",   // Set mode to "horizontal", "vertical" or "fade" (only first letter needed); replaces vertical option
			resizeContents      : false,      // If true, solitary images/objects in the panel will expand to fit the viewport
			buildStartStop      : false,      // If true, builds the start/stop button
			forwardText         : "Next", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
			backText            : "Previous", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
			hashTags            : false,      // Should links change the hashtag in the URL?
			animationTime       : 400,       // How long the slideshow transition takes (in milliseconds)
			
			onBeforeInitialize: loadDescriptionColors,

			onInitialized: function(e, slider) { // Callback when the plugin finishes initializing
				var start = slider.options.startPanel;
				// allow start & cloned panel images to load
				// the rest get the src removed.
				slider.$items.eq(start).siblings(':not(.cloned)').find('img').each(function() {
					var $el = $(this);
					$el.attr('src', function(i, src) {
						if (src !== '') {
							$el.attr('data-src', src);
						}
						return '';
					});
				});
				// load current image
				loadImg(slider, slider.currentPage);
				// load first cloned slide #0
				loadImg(slider, 0);
				// load last cloned slide #6
				loadImg(slider, slider.pages-1);
				// trigger slide complete to preload the next slide image
				slider.$el.trigger('slide_complete', slider);

			},
			
			onSlideInit: function(e, slider) { // Callback when slide initiates, before control animation
				// preload the targeted page image
				loadImg(slider, slider.targetPage);
			},
			// onSlideBegin        : function(e, slider) {}, // Callback before slide animates

			onSlideComplete: function(slider) {
				// *** PRELOAD THE NEXT SLIDE IMAGE ***
				loadImg(slider, slider.currentPage + 1);
				// *** PRELOAD THE PREVIOUS SLIDE IMAGE ***
				loadImg(slider, slider.currentPage - 2);
			}

			// Interactivity
			// clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
			// clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
			// clickControls       : "click focusin", // Events used to activate navigation control functionality
			// clickSlideshow      : "click",         // Event used to activate slideshow play/stop button
			// allowRapidChange    : false,           // If true, allow rapid changing of the active pane, instead of ignoring activity during animation
		});	


		// Reset anythingslider on window resize
		$(window).resize(function() {
			$('#slider').anythingSlider();
		});

	}



	/* Func: loadImg
	 * Desc: Load slider images (only the first image is loaded with the page)
	 * Args: none
	 */
	function loadImg (slider, page) {
		slider.$items.eq(page).find('img').each(function() {
			if ($(this).attr('src') === '') {
				var newsrc = $(this).attr('data-src');
				$(this).attr('src', newsrc);
			}
		});
		$('#slider').anythingSlider();
	}




	/* Func: loadDescriptionColors
	 * Desc: Set the CSS for the background of the description box
	 * Args: none
	 */
	function loadDescriptionColors() {
		var descList = $('.feature-description');

		if( !descList ) {
			return;
		}

		for (var x = 0; x < descList.size(); x++ ) {
			var desc = $(descList[x]),
				
			// Colors
				background = desc.attr('data-background'),
				shadow = desc.attr('data-shadow'),

			// Conversions
				insetShadow = 'inset 0 0 110px 5px ' + shadow + ', ',
				boxShadow = '0 0 12px rgba(0,0,0,0.25)',
				shadowCSSbase = insetShadow + boxShadow;

			// Add CSS
			desc.css("background-color", background);
			desc.css("border-left-color", background);
			desc.css("-webkit-box-shadow", shadowCSSbase);
			desc.css("-moz-box-shadow", shadowCSSbase);
			desc.css("box-shadow", shadowCSSbase);
		}
	}




}(jQuery));





