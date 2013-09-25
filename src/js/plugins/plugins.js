/*! 

* @fileOverview Plugins.js
* @version 1.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/plugins.js
*
* This is where you should include any custom plugins needed for this site.
*/


/* 
 =======================
 Custom plugins
 =======================
 */

var plugins = (function ($) {

/*!
Func: ExecuteAfterBreakpoint
Desc: Execute a function once (and only once) after a pixel width has been reached
Auth: Nate Walton (BYU Web Community Project) */

window.executeAfterBreakpoint = function(functionObject, breakpoint) {

	"use strict";

	// Has the function been executed yet?
	var functionsExecuted = false;
	var functions = functionObject;



	// Normalize functions variable to array (plugin can take either single function or array of functions)
	if( typeof(functionObject) === "function" ) {
		functions = [functionObject];
	}



	// Input checking
	if( ! functions instanceof Array ) {
		console.log('ExecuteAfterBreakpoint error: functionObj must be a function or an array of functions');
		console.log('Syntax: executeAfterBreakpoint(functionObj, breakpoint)');
		console.log('Your argument: ' + functionObject);
		return;
	}
	if( typeof(breakpoint) !== "number" ) {
		console.log('ExecuteAfterBreakpoint error: breakpoint must be a number');
		console.log('Syntax: executeAfterBreakpoint(functionObj, breakpoint)');
		console.log('Your argument: ' + breakpoint);
		return;
	}



	// If window size is already past the breakpoint, just execute the function
	if( !functionsExecuted && $(window).width() > breakpoint ) {
		executeFunctions();
	}

	// Otherwise, check on resize whether the breakpoint has been reached
	else {
		$(window).resize( checkBreakpoint );
	}



	/* Func: checkBreakpoint
	 * Desc: Check to see if the breakpoint has been reached, and execute the function if so.
	 * Args: none
	 */
	function checkBreakpoint() {
		
		// If the scripts have not been activated, and the size threshold has been crossed
		if( !functionsExecuted && $(window).width() > breakpoint ) {

			// Execute the function
			executeFunctions();

			// Turn off the resize checking
			$(window).off('resize', checkBreakpoint);
		}
	}



	/* Func: executeFunctions
	 * Desc: Execute each function in the functions array
	 * Args: none
	 */
	function executeFunctions() {
		var len = functions.length;

		functionsExecuted = true;

		for ( var x = 0; x < len; x++ ) {
			functions[x]();
		}

	}

};

})(jQuery);





/*!

Func: log
Desc: Console.log wrapper 
Usage: log('inside coolFunc',this,arguments);
Auth: paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/ */
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};
/*!

Catch all document.write() calls */
(function(doc){var write=doc.write;doc.write=function(q){log('document.write():',arguments);if(/docwriteregexwhitelist/.test(q))write.apply(doc,arguments);};})(document);


