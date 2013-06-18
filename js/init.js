/*! init.js */

$LAB
  .script("http://byuweb.github.io/Global-Assets/js/jquery-1.9.1.min.js").wait()
  .script("http://byuweb.github.io/Global-Assets/js/jquery-migrate-1.1.1.min.js")
  .script("js/script.min.js");

if(Modernizr.fontface){
  $LAB
    .script("js/fonts.min.js"); }
