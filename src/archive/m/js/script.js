/* Script.js
 * Developed by the BYU Web Team
 * Updated 20 Mar 2012
 */


var byu_template = (function ($) {

/** Variables **/
  
  var startWidth = null;
  var w = 0;      // window.width
  var sm = 300;    // small width threshold
  var md = 600;    // medium width threshold
  var lg = 800;    // large width threshold
  var xl = 1300;    // extra-large width threshold
  var smx = false;  // slider and menus loaded (small width passed)
  var mdx = false;  // menu images loaded (middle width passed)
  var lgx = false;  // large images loaded (wide width passed)
  var xlx = false;  // images for extra-large size loaded (wide width passed)
  
  var newsLoaded = false;  // Images loaded for the news items
  var ftrLoaded  = false;  // Feature loaded
  var srchLoaded = false;  // Search loaded
  var priLoaded  = false;  // Primary nav menu loaded
  var secLoaded  = false;  // Secondary nav menu loaded
  var menuLoaded = false;  // Menu images loaded
  var sldrLoaded = false;  // Menu images loaded
  
  var tryCount = {};  // An object to keep track of the number of times you try stuff
  var tryIn  = 100;  // Milliseconds between tries
  var tryFor = 600;  // The number of times to try before you give up (600 tries at 100ms = 1 minute)

  var sliderOptions = {
        animation: "slide",
        slideshow: false,
        animationDuration: 300,
        prevText: "Previous story",
        nextText: "Next story",
        before: function(){ if(w < 1247) $('.flex-control-nav, .flex-direction-nav').hide();},
        after: function(){ if(w < 1247) $('.flex-control-nav, .flex-direction-nav').fadeIn(200);}
      };

  var menuOptions = {
        animation: "slide",
        slideshow: false,
        animationDuration: 300,
        prevText: "Previous",
        nextText: "Next",
        controlNav: false
      };

  /*  Options to customize flexSlider
  
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
    mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
    playText: 'Play',               //String: Set the text for the "play" pausePlay item
    randomize: false,               //Boolean: Randomize slide order
    slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    controlsContainer: "",          //Selector: Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.
    manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){}               //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
  */






  

/** On Page Load **/
  
  $(function() {
    var initWidth = getCookie('screenwidth');
    w = $(window).width();
    startWidth = $('body').attr('data-width');
    
    log('Start width: ', startWidth);
    //$(window).resize(adjustSize);
    
    // Use the throttled resize plugin so it doesn't get fired too often
    $(window).on("throttledresize", adjustSize);
    adjustSize();
    log('Screen width: ' + w);
    //$('#calendar').before('<p id="testWidth" style="padding-left:5%">Screen width: '+ $(window).width() +'</p>');
    
    /* ENABLE THIS WHEN YOU'VE GOT PHP ADDING STUFF BASED ON THE COOKIES 
    if(initWidth > sm) { 
      smx = true;
      newsLoaded = true;
      ftrLoaded  = true;
      srchLoaded = true;
      priLoaded  = true; 
      secLoaded  = true; 
      
      if(initWidth > md) { 
        mdx = true;
        if(initWidth > lg) { 
          lgx = true; 
          menuLoaded = true;
        }
      }
    } */
    
    setCookie('screenwidth', w, 40);
  });









/** Functions **/
  
  /* Func: AdjustSize
   * Desc: Call all functions that need to execute on page resize
   */
  function adjustSize() {
  
    w = $(window).width();
    setCookie('screenwidth', w, 40);
    
    //$('#testWidth').html('Screen width: ' + w);
    
    if(w >= sm && !smx) { adjustSm(); }
    if(w >= md && !mdx) { adjustMd(); }
    if(w >= lg && !lgx) { adjustLg(); }
    if(w >= xl && !xlx) { adjustXl(); }
  }









  /* Func: SetCookie
   * Desc: Set a cookie in the browser
   */
  function setCookie(c_name,value,exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  }
  
  

  /* Func: GetCookie
   * Desc: Get a cookie from the browser
   */
  function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++) {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      
      if (x==c_name) {
        return unescape(y);
      }
    }
  }







  /* Func: AdjustSm
   * Desc: Perform actions needed at small width threshold
   */
  function adjustSm() {
    log('small');

    newsLoaded = loadImages('#news');
    loadFeatures();
    loadSearch();
    loadPrimaryNav();
    loadSecondaryNav();
        
    smx = true;
  }


  /* Func: AdjustMd
   * Desc: Perform actions needed at medium width threshold
   */
  function adjustMd() {
    log('med');
    
    if(!$('body').hasClass('frontpage')) {
      mdx = true;
      return;
    }
    
    // Don't try to load the primary nav images until the nav has been loaded
    if(ftrLoaded) {
      loadBigImages();
      addBgColors();
    } else if (tryCount.md < tryFor || tryCount.md === undefined) {
      if (tryCount.md === undefined) {
        tryCount.md = 0;
      }
      tryCount.md = tryCount.md + 1;
      window.setTimeout(adjustMd, tryIn);
    } else {
      log('Couldn\'t load big images');
    }
        
    mdx = true;
  }


  /* Func: AdjustLg
   * Desc: Perform actions needed at large width threshold
   */
  function adjustLg() {
    log('large');
    
    // Don't try to load the primary nav images until the nav has been loaded
    if(priLoaded) {
      menuLoaded = loadImages('#primary-nav');
      log('Load menu images');
    } else if (tryCount.lg < tryFor || tryCount.lg === undefined) {
      if (tryCount.lg === undefined) {
        tryCount.lg = 0;
      }
      tryCount.lg = tryCount.lg + 1;
      window.setTimeout(adjustLg, tryIn);
    } else {
      log('Couldn\'t load menu images');
    }
    
    lgx = true;
  }




  /* Func: AdjustXl
   * Desc: Perform actions needed at extra-large width threshold
   */
  function adjustXl() {
    log('x-large');
    
    // Don't try to do anything with the slider nav images until the feature images have been loaded
    if(ftrLoaded) {
      loadSliderMenuImages();
    } else if (tryCount.xl < tryFor || tryCount.xl === undefined) {
      if (tryCount.xl === undefined) {
        tryCount.xl = 0;
      }
      tryCount.xl = tryCount.xl + 1;
      window.setTimeout(adjustXl, tryIn);
    } else {
      log('Couldn\'t load x-large images');
    }

    xlx = true;
  }











  /* Func: LoadImages
   * Desc: Replace image placeholder spans with the actual images.
   *      The markup for the placeholders is:  <span class='img' data-alt='' data-src=''></span>
   *      where data-alt and data-src contain the alt and src attributes for the eventual img tag.
   * Args: @context - The context (CSS selector) within which to operate
   */
  function loadImages(context) {
    $(context + ' span.img').each(function () {
      var span = $(this);
      var url = span.removeClass('img').attr('data-src');
      var alt = span.attr('data-alt');
      span.replaceWith('<img src="' + url + '" alt="' + alt + '" />');
    });
    return true;
  }



  /* Func: LoadFeatures
   * Desc: Get the feature slider and load it into place
   */
  function loadFeatures() {
    log('Load features');
    $('#slider').load('feature.php #slides', function(response, status, xhr){
      if (status == "error") {
        log(response);
        return false;
      } else {
        startSlider();
        ftrLoaded = true;
      }
    });
  }



  /* Func: LoadPrimaryNav
   * Desc: Get the primary nav menu and load it into place
   */
  function loadPrimaryNav() {
    $('#main-header').append('<div id="loader1"></div>');
    $('#loader1').load('nav.php #primary-nav', function(response, status, xhr){
      if (status == "error") {
        return false;
      } else {
        $('#primary-nav').unwrap();
        priLoaded = true;
        initPrimary();
      }
    });
  }



  /* Func: LoadSecondaryNav
   * Desc: Get the secondary nav menu and load it into place
   */
  function loadSecondaryNav() {
    $('#header-top').append('<div id="loader2"></div>');
    $('#loader2').load('nav.php #secondary-nav', function(response, status, xhr){
      if (status == "error") {
        return false;
      } else {
        $('#secondary-nav').unwrap();
        secLoaded = true;
        initSecondary();
      }
    });
  }



  /* Func: LoadSearch
   * Desc: Get the search box and load it into place
   */
  function loadSearch() {
    $('#search-container').append('<div id="loader3"></div>');
    $('#loader3').load('search.php #searchForm', function(response, status, xhr){
      if (status == "error") {
        return false;
      } else {
        $('#searchForm').unwrap();
        initSearch();
        srchLoaded = true;
      }
    });
  }




  /* Func: InitSearch
   * Desc: Get the search box and load it into place
   */
  function initSearch() {
    $('a.search').click(function(e){
      e.preventDefault();
      
      var href = $(this).attr('href');
      var search = $('#search-container');
      var open = search.hasClass('open');
      
      if(w < sm){
        window.location.href = href;
        return true;
      }
      
      if(!open){
        search.addClass('open');
      } else {
        search.removeClass('open');
      }
      
    });  
  }



  /* Func: LoadSliderMenuImages
   * Desc: Load images into the slider nav
   */
  function loadSliderMenuImages() {
    
    var nav = $('.flex-control-nav');
    
    if(nav[0]) {    
      var count = 0;
      
      var links = nav.find('li a').empty();
  
      $('#slides > li').not('.clone').each(function(){
        var li = $(this);
        var full = li.hasClass('full');
        var img = li.find('img');
        var thisLink = links[count];
                        
        var newImage = img.clone();
        
        var src = newImage.attr('src');
        src = src.replace('lg', 'med');
        newImage.attr('src', src);
        
        if(full) {
          newImage.addClass('full');
        }
        
        newImage.appendTo(thisLink);
        
        count++;
      });
      log('Feature menu images loaded');
      
    } else if (tryCount.slidermenu < tryFor || tryCount.slidermenu === undefined) { // If they're not loaded, try again every 100ms for 10 seconds
      if(tryCount.slidermenu === undefined) {
        tryCount.slidermenu = 0;
      }
      tryCount.slidermenu = tryCount.slidermenu + 1;
      window.setTimeout(loadSliderMenuImages, tryIn);
      
    } else { // If that doesn't work, give up
      log('Couldn\'t load feature menu images');
    }
    
  }






  /* Func: InitPrimary
   * Desc: Add function to the primary nav
   */
  function initPrimary() {
    
    // Add open and close classes on click for the "Menu" button
    $('#primary-nav-menu').delegate('a', 'click', function(e){
      e.preventDefault();
      var href = $(this).attr('href');
      
      if(w < sm){
        window.location.href = href;
        return true;
      }
      
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $('#primary-nav, #secondary-nav').removeClass('open');
        $('#content').removeClass('menu-open');
      } else {
        $(this).addClass('open');
        openPrimary();
      }
      return false;
    });
    
    // Add the back button to each mega dropdown for small sizes
    $('#primary-nav .mega').prepend('<a href="#" class="back">Back</a>');
    
    // Add the click-off div
    $('#primary-nav').after('<div id="primary-click" class="click-off" style="display:none"></div>');
    $('.click-off').click(closeAllMenus);
    
    
    // Add a heading to each mega dropdown for small sizes
    $('#primary-nav  > ul > li > a').each(function(){
      var txt  = $(this).html();
      var mega = $(this).next('.mega');
      $(this).addClass('primary');
      mega.prepend('<h3>' + txt + '</h3>');
    });
    
    // Handle clicks on the primary nav items
    $('#primary-nav')
      .delegate('a.primary', 'click', function(e){
        e.preventDefault();
        var li = $(this).parent();
  
        log(e.currentTarget.firstChild.data);
        
        if(li.hasClass('open')) {
          closeAllMenus();          
        } else {
          $('#primary-nav > ul > li, #secondary-nav > ul > li').removeClass('open');
          li.addClass('open');
          $('.click-off').show();
        }
        
        if(w < 600) {
          $('#primary-nav').animate({left:'-100%'}, 200, function(){
            $('#primary-nav').addClass('sub-open');
          });
        }
      })
      .delegate('a.primary', 'hover', function(e){
        
        if(w >= 800) {
          var li = $(this).parent();
          var len = $('#primary-nav > ul > li.open').size();  
          
          if(len > 0 ) {
            $('#primary-nav > ul > li').removeClass('open');
            li.addClass('open');
          }
        }
        
      });
    
    // Slide back when the back button is clicked
    $('#primary-nav .mega').delegate('a.back', 'click', function(e){
      e.preventDefault();
      
      $('#primary-nav').animate({left:'0'}, 100, function(){
        $('#primary-nav').removeClass('sub-open');
        $('#primary-nav > ul > li').removeClass('open');
      });
    });
        
  }
  
  
  /* Func: OpenPrimary
   * Desc: Open the main primary menu, close the secondary menu(s)
   */  
  function openPrimary() {
    // Turn off secondary menu
    $('#secondary-nav > ul > li').removeClass('open');
    
    // Turn on primary menu
    $('#primary-nav, #secondary-nav').addClass('open');
    $('#content').addClass('menu-open');
        
    // Open one of the primary items if needed
    if(w >= 600  && w < 800) {
      var len = $('#primary-nav > ul > li.open').size();
      if(len === 0) {
        $('#primary-nav > ul > li').first().addClass('open');
      }
    }
  }
  
  
  


  /* Func: InitSecondary
   * Desc: Add function to the secondary nav
   */
  function initSecondary() {
    var today = new Date();
    var day   = today.getDay();
    var date  = today.getDate();
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
    $('#secondary-nav')
      .wrap('<div class="flex-container">')
      .addClass('flexslider')
      .find('ul').first()
        .addClass('slides');
    
    // Start flexslider for secondary menu
    $('#secondary-nav.flexslider').flexslider(menuOptions);
    
    // Add day and date to events icon
    $('#secondary-nav #mobile a.events-m').prepend('<div class="day">' + days[day] + '</div><div class="date">' + date + '</div>');
    
    // Make targeting easier
    $('#secondary-nav > ul > li').addClass('top');

    // Add click events to secondary nav    
    $('#secondary-nav > ul')
      .delegate('li.top', 'click', function(e){
        e.preventDefault();
        var li = $(this);
        
        if(w > 599) {
          $('#primary-nav-menu a, #primary-nav').removeClass('open');
        }
        if(li.hasClass('open')) {
          $('#secondary-nav > ul > li').removeClass('open');
          $('.click-off').hide();
        } else {
          $('#secondary-nav > ul > li').removeClass('open');
          li.addClass('open');
          $('.click-off').show();
          
          if(w >= 800) {
            $('#primary-nav li.open').removeClass('open');
          }
        }
      })
      .delegate('li.top', 'hover', function(e){
        var len = $('#secondary-nav > ul > li.open').size();
        if(len > 0) {
          var li = $(this);
          $('#secondary-nav > ul > li').removeClass('open');
          li.addClass('open');
        }
      });
  }



  /* Func: CloseAllMenus
   * Desc: Close all of the menus
   */
  function closeAllMenus() {
        
    $('#primary-nav, #secondary-nav').removeClass('open');
    $('#content').removeClass('menu-open');
    
    $('#primary-nav').removeClass('sub-open');
    $('#primary-nav > ul > li').removeClass('open');

    $('#secondary-nav > ul > li').removeClass('open');

    $('.click-off').hide();
  }





  /* Func: StartSlider
   * Desc: Enable the feature slider
   */
  function startSlider() {
  
    // Don't start the slider until the feature slides are loaded into the page
    if(ftrLoaded) {
      // This was to adjust stuff while keeping the same format as the previous site. But it makes for strange-looking loading. We'll just update the markup.
      //$('#slider').addClass('slides');
      //$('#feature').addClass('flexslider').wrap('<div class="flex-container">').attr('id', '');
      
      $('#content .flexslider').flexslider(sliderOptions);
      $('html').removeClass('no-flexslider').addClass('yes-flexslider');
      //$('.flex-direction-nav a').attr('href', '');
      
      log('Start slider');
      
    } else if (tryCount.slider < tryFor || tryCount.slider === undefined) { // If they're not loaded, try again every 100ms for 10 seconds
      if(tryCount.slider === undefined) {
        tryCount.slider = 0;
      }
      tryCount.slider = tryCount.slider + 1;
      window.setTimeout(startSlider, tryIn);
      
    } else { // If that doesn't work, give up
      log('Couldn\'t start slider');
    }
    
  }









  /* Func: LoadBigImages
   * Desc: Replace the small feature images with full-size ones
   */
  function loadBigImages() {
    log('load big images');
    
    // Switch all of the small images in the feature to big ones
    $('.flexslider img').each(function(){
      var s = $(this).attr('src');
      var li = $(this).closest('li');

      // Replace the images
      s = s.replace(".med.", ".lg.");
      $('html').addClass('fullsize-images');
      
      // Flag for wide images
      if (li.hasClass('full')) {
        li.find('a').first().addClass('wide');
      }
      
      $(this).attr('src', s);
    });
  }


  /* Func: AddBgColors
   * Desc: Replace the small feature images with full-size ones
   */
  function addBgColors() {
    
    // Switch all of the small images in the feature to big ones
    $('.flexslider .feature-description').each(function(){
      var c = $(this).attr('data-bg');
      var g = $(this).attr('data-gradient');
      var y = Modernizr.cssgradients;
      var t = $(this).attr('data-text');      

      // Add white inner
      if(g === undefined) {
        var c2 = colorLuminance(c, 0.35);
        
        $(this).css('background-color', c2);
      
        $(this)
          .css('box-shadow', makeInset(c, '-webkit-'))
          .css('box-shadow', makeInset(c, '-moz-'))
          .css('box-shadow', makeInset(c, '-ms-'))
          .css('box-shadow', makeInset(c, '-o-'))
          .css('box-shadow', makeInset(c, ''));
        $(this).css('border-left', '1px solid #fff');
      } 
      
      // Add dark outer  
      else {
        var c2 = colorLuminance(c, g);
        $(this).css('background-color', c);
      
        $(this)
          .css('box-shadow', makeInset(c2, '-webkit-'))
          .css('box-shadow', makeInset(c2, '-moz-'))
          .css('box-shadow', makeInset(c2, '-ms-'))
          .css('box-shadow', makeInset(c2, '-o-'))
          .css('box-shadow', makeInset(c2, ''));
        $(this).css('border-left', '1px solid #fff');
      }
            
      // Change text color if needed
      if(t == "light") {
        $(this).addClass('lightText');
      }
      
    });
  }
  
  
  /* Func: MakeInset
   * Desc: Return an inset shadow for the feature piece
   * Args: @hex - the color to change
   *       @lum - the factor to calculate (from -1 to 1)
   */
   function makeInset(hex, prefix) {
   
     var inset =  prefix + 'inset 10px 0px 110px' + hex;
     
     return inset;
   }
  
  /* Func: MakeGradient
   * Desc: Return a gradient for the feature piece
   * Args: @hex - the color to change
   *     @lum - the factor to calculate (from -1 to 1)
   */
  function makeGradient(hex, lum, prefix) {
    var lum1 = lum/3;
    var c1 = hex;
    var c2 = colorLuminance(hex, lum1);
    var c3 = colorLuminance(hex, lum);
    
    // Radial Gradient
    //var g = '130px 196px, ellipse closest-corner, ' + c1 + ' 20%, ' + c2 + ', ' + c3;
    //var gradient = prefix + "radial-gradient(" + g + ")";
    
    // Linear Gradient
    var g = 'left, ' + c1 + '0%,' + c2 + '20%,' + c2 + '80%,' + c1 + '100%';
    var gradient = prefix + "linear-gradient(" + g + ")";
    
    return gradient;
  }



  
  
  /* Func: ColorLuminance
   * Desc: Change the luminance of a hex color
   * Args: @hex - the color to change
   *     @lum - the factor to calculate (from -1 to 1)
   */  
  function colorLuminance(hex, lum) {  
      // validate hex string  
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {  
          hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];  
      }  
      lum = lum || 0;  
      // convert to decimal and change luminosity  
      var rgb = "#", c, i;  
      for (i = 0; i < 3; i++) {
          c = parseInt(hex.substr(i*2,2), 16);  
          c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);  
          rgb += ("00"+c).substr(c.length);  
      }  
      return rgb;  
  } 


})(jQuery);











