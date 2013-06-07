
// /* Load specific fonts */
// WebFont.load({
//         google: {
//             families: ["Open+Sans:400italic,600italic,400,600:latin", "Crete+Round:400,400italic:latin", 'Droid+Serif:latin']
//         }
//     });

function progress(message) {
  var output = document.getElementById('events');
  if (output) {
    var e = document.createElement('li');
    e.innerHTML = message;
    output.appendChild(e);
  }
  if (window.console && window.console.log) {
    window.console.log(message);
  }
}


WebFont.load({
  custom: {
    families: ['ChunkFiveRegular'],
    urls : ['http://seanmcb.com/typekit/wfl/stylesheet.css']
  },
  loading: function() {
    progress('loading');
  },
  active: function() {
    progress('active');
  },
  inactive: function() {
    progress('inactive');
  },
  fontloading: function(fontFamily, fontDescription) {
    progress('fontloading: ' + fontFamily + ' (' + fontDescription + ')');
  },
  fontactive: function(fontFamily, fontDescription) {
    progress('fontactive: ' + fontFamily + ' (' + fontDescription + ')');
  },
  fontinactive: function(fontFamily, fontDescription) {
    progress('fontinactive: ' + fontFamily + ' (' + fontDescription + ')');
  }
});