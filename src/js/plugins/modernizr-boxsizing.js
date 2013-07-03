// https://gist.github.com/pfulton/4253505

// test whether or not CSS box-sizing is supported. Append the relevant classes to the html element.
// for reference: http://www.snackoclock.net/2012/08/simple-box-sizing-border-box-fallback-for-ie/
 
Modernizr.addTest("boxsizing", function() {
    return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7);
});