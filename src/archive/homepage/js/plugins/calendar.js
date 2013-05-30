var byu_calendar = (function($) {

$(function () {
	var cal = $('#calendarDays');
	var startDate = new Date();
	var endDate = new Date();
	endDate.setDate(startDate.getDate() + 2);

	cal.children('h3').html(startDate.format('dddd, mmmm d'));

	$.ajax({ url: "http://unicomm.byu.edu/calendartest/Webservice/v1/", data: { startDate: startDate.format('m/d/yyyy'), endDate: endDate.format('m/d/yyyy') }, dataType: "jsonp", timeout: 5000 }).success(function (data) {
		var html = '';
		var lastDate = null;
		for (var x in data) {
			var thisDate = dateFromDotNet(data[x].Start);
			if (lastDate == null || thisDate.toDateString() != lastDate.toDateString()) {
				if(x > 8)
					break;
				if(lastDate != null)
					html += '</div>';					
				html += '<div class="day"><h3><span class="date">' + thisDate.format('d') + '</span>' + thisDate.format("mmm, dddd") + '</h3>';
			}
			html += '<a href="http://calendar.byu.edu/calendar/' + thisDate.format('yyyy-mm-dd') + '">' + data[x].Title + '</a><span class="time">' + ((data[x].AllDay) ? "All Day" : thisDate.format("h:MM tt")) + '</span>';
			lastDate = thisDate;
		}
		$(html + '</div>').insertAfter(cal);
	})
	.error(function (status) {
		var textStatus = status.statusText;
		if (textStatus == "timeout")
			alert("Sorry, your request has timed out, please try again later");
		else if (textStatus == "parsererror")
			alert("Sorry, response is corrupted, please try again later");
		else
			alert("Error, status: " + textStatus + ", please try again later");
	});
});

function dateFromDotNet(input, throwOnInvalidInput) {
	var pattern = /Date\(([^)]+)\)/;

	var results = pattern.exec(input);
	if (results.length != 2) {
		if (!throwOnInvalidInput) {
			return s;
		}
		throw new Error(s + " is not .net json date.");
	}
	return new Date(parseFloat(results[1]));
}
})(jQuery);

/*
 * Date Format 1.2.3 minified using Google Closure Compiler
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
var dateFormat=function(){var j=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,k=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,r=/[^-+\dA-Z]/g,d=function(a,c){a=String(a);for(c=c||2;a.length<c;)a="0"+a;return a};return function(a,c,h){var f=dateFormat;arguments.length==1&&Object.prototype.toString.call(a)=="[object String]"&&!/\d/.test(a)&&(c=a,a=void 0);a=a?new Date(a):new Date;if(isNaN(a))throw SyntaxError("invalid date");
c=String(f.masks[c]||c||f.masks["default"]);c.slice(0,4)=="UTC:"&&(c=c.slice(4),h=!0);var b=h?"getUTC":"get",g=a[b+"Date"](),m=a[b+"Day"](),i=a[b+"Month"](),n=a[b+"FullYear"](),e=a[b+"Hours"](),o=a[b+"Minutes"](),p=a[b+"Seconds"](),b=a[b+"Milliseconds"](),l=h?0:a.getTimezoneOffset(),q={d:g,dd:d(g),ddd:f.i18n.dayNames[m],dddd:f.i18n.dayNames[m+7],m:i+1,mm:d(i+1),mmm:f.i18n.monthNames[i],mmmm:f.i18n.monthNames[i+12],yy:String(n).slice(2),yyyy:n,h:e%12||12,hh:d(e%12||12),H:e,HH:d(e),M:o,MM:d(o),s:p,
ss:d(p),l:d(b,3),L:d(b>99?Math.round(b/10):b),t:e<12?"a":"p",tt:e<12?"am":"pm",T:e<12?"A":"P",TT:e<12?"AM":"PM",Z:h?"UTC":(String(a).match(k)||[""]).pop().replace(r,""),o:(l>0?"-":"+")+d(Math.floor(Math.abs(l)/60)*100+Math.abs(l)%60,4),S:["th","st","nd","rd"][g%10>3?0:(g%100-g%10!=10)*g%10]};return c.replace(j,function(a){return a in q?q[a]:a.slice(1,a.length-1)})}}();
dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};
dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Date.prototype.format=function(j,k){return dateFormat(this,j,k)};

