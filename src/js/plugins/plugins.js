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


/* Custom plugins here */









/* Console.log wrapper */

// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};
// catch all document.write() calls
(function(doc){var write=doc.write;doc.write=function(q){log('document.write():',arguments);if(/docwriteregexwhitelist/.test(q))write.apply(doc,arguments);};})(document);


