if(Modernizr.mq('all and (min-width:0px)')) {
  $LAB
    .script("js/libs/jquery.min.js").wait()
    .script("js/script.min.js"); }

if(Modernizr.fontface){
  $LAB
    .script("js/fonts.min.js"); }
