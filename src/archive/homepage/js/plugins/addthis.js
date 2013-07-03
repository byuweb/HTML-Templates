(function ($) {

    $(function () {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://s7.addthis.com/js/250/addthis_widget.js#pubid=' + addThisUsername;
        head.appendChild(script);
    });

})(jQuery);