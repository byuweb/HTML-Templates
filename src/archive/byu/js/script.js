/* 
 * script.js
 * BYU Theme
 */
 
 /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(e){e.respond={};respond.update=function(){};respond.mediaQueriesSupported=e.matchMedia&&e.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return}var w=e.document,s=w.documentElement,i=[],k=[],q=[],o={},h=30,f=w.getElementsByTagName("head")[0]||s,g=w.getElementsByTagName("base")[0],b=f.getElementsByTagName("link"),d=[],a=function(){var D=b,y=D.length,B=0,A,z,C,x;for(;B<y;B++){A=D[B],z=A.href,C=A.media,x=A.rel&&A.rel.toLowerCase()==="stylesheet";if(!!z&&x&&!o[z]){if(A.styleSheet&&A.styleSheet.rawCssText){m(A.styleSheet.rawCssText,z,C);o[z]=true}else{if((!/^([a-zA-Z:]*\/\/)/.test(z)&&!g)||z.replace(RegExp.$1,"").split("/")[0]===e.location.host){d.push({href:z,media:C})}}}}u()},u=function(){if(d.length){var x=d.shift();n(x.href,function(y){m(y,x.href,x.media);o[x.href]=true;u()})}},m=function(I,x,z){var G=I.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),J=G&&G.length||0,x=x.substring(0,x.lastIndexOf("/")),y=function(K){return K.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+x+"$2$3")},A=!J&&z,D=0,C,E,F,B,H;if(x.length){x+="/"}if(A){J=1}for(;D<J;D++){C=0;if(A){E=z;k.push(y(I))}else{E=G[D].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;k.push(RegExp.$2&&y(RegExp.$2))}B=E.split(",");H=B.length;for(;C<H;C++){F=B[C];i.push({media:F.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:k.length-1,hasquery:F.indexOf("(")>-1,minw:F.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:F.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}j()},l,r,v=function(){var z,A=w.createElement("div"),x=w.body,y=false;A.style.cssText="position:absolute;font-size:1em;width:1em";if(!x){x=y=w.createElement("body");x.style.background="none"}x.appendChild(A);s.insertBefore(x,s.firstChild);z=A.offsetWidth;if(y){s.removeChild(x)}else{x.removeChild(A)}z=p=parseFloat(z);return z},p,j=function(I){var x="clientWidth",B=s[x],H=w.compatMode==="CSS1Compat"&&B||w.body[x]||B,D={},G=b[b.length-1],z=(new Date()).getTime();if(I&&l&&z-l<h){clearTimeout(r);r=setTimeout(j,h);return}else{l=z}for(var E in i){var K=i[E],C=K.minw,J=K.maxw,A=C===null,L=J===null,y="em";if(!!C){C=parseFloat(C)*(C.indexOf(y)>-1?(p||v()):1)}if(!!J){J=parseFloat(J)*(J.indexOf(y)>-1?(p||v()):1)}if(!K.hasquery||(!A||!L)&&(A||H>=C)&&(L||H<=J)){if(!D[K.media]){D[K.media]=[]}D[K.media].push(k[K.rules])}}for(var E in q){if(q[E]&&q[E].parentNode===f){f.removeChild(q[E])}}for(var E in D){var M=w.createElement("style"),F=D[E].join("\n");M.type="text/css";M.media=E;f.insertBefore(M,G.nextSibling);if(M.styleSheet){M.styleSheet.cssText=F}else{M.appendChild(w.createTextNode(F))}q.push(M)}},n=function(x,z){var y=c();if(!y){return}y.open("GET",x,true);y.onreadystatechange=function(){if(y.readyState!=4||y.status!=200&&y.status!=304){return}z(y.responseText)};if(y.readyState==4){return}y.send(null)},c=(function(){var x=false;try{x=new XMLHttpRequest()}catch(y){x=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return x}})();a();respond.update=a;function t(){j(true)}if(e.addEventListener){e.addEventListener("resize",t,false)}else{if(e.attachEvent){e.attachEvent("onresize",t)}}})(this);

var byu_template = (function ($) {

  var clickOpened = false;

  /* PAGE LOAD */
  $(function () {
    //setupNavPosition();
    activateMenus();
    loadMenuImages();

    if (!Modernizr.borderradius) {
      var searchButton = $('#search-button');
      searchButton.attr('src', 'template/img/search-button.png');
      searchButton.css('display', 'inline');
      $('#search').css('margin-right', '24px');
    }

    $(window).resize(positionFooter);
    positionFooter();
  });
  
  
  
  /* FUNCTIONS */

  function positionFooter() {
    $('#content').css('minHeight', ($(window).height() - $('header').height() - $('footer').height() - 50) + 'px');
  }

  function loadMenuImages() {
    $('span.img').each(function () {
      var span = $(this);
      var url = span.removeClass('img').attr('class'),
      alt = span.attr('title');
      span.replaceWith('<img src="' + (typeof webRoot === 'undefined' ? '' : webRoot + (endsWith(webRoot, '/') ? '' : '/')) + 'images/menu/' + url + '" alt="' + alt + '" />');
    });
  }
  
  
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
  }


  /* Func: SetPrimaryNavPosition
   * Desc: Move the nav around so it works in the sidebar
   * Args: none
   */
  function setupNavPosition() {
    $('#main-header').append('<div class="nav-container"></div>');
    $('#secondary-nav, #primary-nav').detach().appendTo('.nav-container');
  }


  /* Func: RollOver
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
    //if(evt !== undefined) evt.stopPropagation();
  }

  /* Func: RollOut
  * Desc: Hide a dropdown menu on rollout. Called by the hoverIntent function.
  * Args: -
  */
  function rollOut() {
    $(this).removeClass('hover');
  }

  /* Func: HideAllMenus
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

})(jQuery);





/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
/* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
//(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);