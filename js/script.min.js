/*! BYU-Templates - v2.0.0  */

function getWidth() {
    var w = jQuery(window).width();
    return log(w), w
}

function activateMenus() {
    jQuery("#search-menu").delegate(".menu-button", "click", function (e) {
        e.stopPropagation(), e.preventDefault(), jQuery("body").toggleClass("sideNav")
    }), jQuery("nav li:has(.mega, .sub) > a").click(function (e) {
        e.preventDefault();
        var li = jQuery(this).parent();
        return li.hasClass("hover") && clickOpened ? li.removeClass("hover") : (li.addClass("hover"), jQuery("nav li").not(li).removeClass("hover"), clickOpened = !0), !1
    }), jQuery("nav li:has(.mega, .sub)").click(function (e) {
        e.stopPropagation()
    }), jQuery("nav.no-js").removeClass("no-js"), jQuery("nav li .sub").each(function () {
        var mega = jQuery(this),
            left = mega.parent().position().left;
        left > mega.parent().parent().outerWidth() - mega.outerWidth() && mega.css("right", 0)
    }), jQuery(window).resize(function () {
        jQuery(window).width() > 768 && jQuery("body").removeClass("sideNav")
    })
}

var hideSearch = function() {

	if (document.readyState == 'complete') {
    // Document is ready when CSE element is initialized.
    // Render an element with both search box and search results in div with id 'test'.
    jQuery("#basic-search").hide();
    google.search.cse.element.render(
        {
          div: "test",
          tag: 'search'
         });
  } else {
    // Document is not ready yet, when CSE element is initialized.
    google.setOnLoadCallback(function() {
       // Render an element with both search box and search results in div with id 'test'.
		google.search.cse.element.render(
            {	
              div: "test",
              tag: 'search'
            });
    }, true);
  }
}

window.__gcse = {
  parsetags: 'callback',
  callback: hideSearch
};

function loadSearch() {

	var cx = "009932716493032633443:hlqjz33kfkc",
		gcse = document.createElement("script");
	gcse.type = "text/javascript";
	gcse.async = true;
	gcse.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//www.google.com/cse/cse.js?cx=" + cx;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(gcse, s);
}

function setupNavPosition() {}

function rollOver() {
    jQuery(this).hasClass("hover") || (clickOpened = !1, jQuery(this).addClass("hover"), jQuery("nav li").not(this).removeClass("hover"), jQuery(document).click(hideAllMenus))
}

function rollOut() {
    jQuery(this).removeClass("hover")
}

function hideAllMenus() {
    jQuery("nav li").removeClass("hover"), jQuery(document).unbind("click")
}

function endsWith(str, suffix) {
    return -1 !== str.indexOf(suffix, str.length - suffix.length)
}! function (jQuery) {
    "use strict";

    function clearMenus() {
        jQuery(".dropdown-backdrop").remove(), jQuery(toggle).each(function () {
            getParent(jQuery(this)).removeClass("open")
        })
    }

    function getParent(jQuerythis) {
        var jQueryparent, selector = jQuerythis.attr("data-target");
        return selector || (selector = jQuerythis.attr("href"), selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*jQuery)/, "")), jQueryparent = selector && jQuery(selector), jQueryparent && jQueryparent.length || (jQueryparent = jQuerythis.parent()), jQueryparent
    }
    var toggle = "[data-toggle=dropdown]",
        Dropdown = function (element) {
            var jQueryel = jQuery(element).on("click.dropdown.data-api", this.toggle);
            jQuery("html").on("click.dropdown.data-api", function () {
                jQueryel.parent().removeClass("open")
            })
        };
    Dropdown.prototype = {
        constructor: Dropdown,
        toggle: function () {
            var jQueryparent, isActive, jQuerythis = jQuery(this);
            if (!jQuerythis.is(".disabled, :disabled")) return jQueryparent = getParent(jQuerythis), isActive = jQueryparent.hasClass("open"), clearMenus(), isActive || ("ontouchstart" in document.documentElement && jQuery('<div class="dropdown-backdrop"/>').insertBefore(jQuery(this)).on("click", clearMenus), jQueryparent.toggleClass("open")), jQuerythis.focus(), !1
        },
        keydown: function (e) {
            var jQuerythis, jQueryitems, jQueryparent, isActive, index;
            if (/(38|40|27)/.test(e.keyCode) && (jQuerythis = jQuery(this), e.preventDefault(), e.stopPropagation(), !jQuerythis.is(".disabled, :disabled"))) {
                if (jQueryparent = getParent(jQuerythis), isActive = jQueryparent.hasClass("open"), !isActive || isActive && 27 == e.keyCode) return 27 == e.which && jQueryparent.find(toggle).focus(), jQuerythis.click();
                jQueryitems = jQuery("[role=menu] li:not(.divider):visible a", jQueryparent), jQueryitems.length && (index = jQueryitems.index(jQueryitems.filter(":focus")), 38 == e.keyCode && index > 0 && index--, 40 == e.keyCode && index < jQueryitems.length - 1 && index++, ~index || (index = 0), jQueryitems.eq(index).focus())
            }
        }
    };
    var old = jQuery.fn.dropdown;
    jQuery.fn.dropdown = function (option) {
        return this.each(function () {
            var jQuerythis = jQuery(this),
                data = jQuerythis.data("dropdown");
            data || jQuerythis.data("dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call(jQuerythis)
        })
    }, jQuery.fn.dropdown.Constructor = Dropdown, jQuery.fn.dropdown.noConflict = function () {
        return jQuery.fn.dropdown = old, this
    }, jQuery(document).on("click.dropdown.data-api", clearMenus).on("click.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.dropdown.data-api", toggle + ", [role=menu]", Dropdown.prototype.keydown)
}(window.jQuery),
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
window.log = function () {
    log.history = log.history || [], log.history.push(arguments), this.console && console.log(Array.prototype.slice.call(arguments))
},
function (doc) {
    var write = doc.write;
    doc.write = function (q) {
        log("document.write():", arguments), /docwriteregexwhitelist/.test(q) && write.apply(doc, arguments)
    }
}(document),
/*! 

* @fileOverview Script.js
* @version 2.0
* 
* @author BYU Web Community
* @see https://github.com/byuweb/
* @see https://github.com/byuweb/byu-responsive-dev/
* @see https://github.com/byuweb/byu-responsive-dev/blob/gh-pages/src/js/script.js
*/
jQuery(function () {
    getWidth(), jQuery(window).resize(getWidth), loadSearch(), activateMenus()
});