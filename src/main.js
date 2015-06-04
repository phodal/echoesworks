/* EW main */

// Base function.
var EchoesWorks = function() {};


// Version.
EchoesWorks.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;

var api = {
  prev: function (){
    console.log("prev");
    return "prev";
  },
  next: function (){
    console.log("next");
    return "next";
  }
};

EchoesWorks.API = api;

document.addEventListener("keydown", function ( event ) {
  if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
    event.preventDefault();
  }
}, false);

document.addEventListener("keyup", function ( event ) {
  if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
    switch( event.keyCode ) {
      case 33: // pg up
      case 37: // left
      case 38: // up
        api.prev();
        break;
      case 9:  // tab
      case 32: // space
      case 34: // pg down
      case 39: // right
      case 40: // down
        api.next();
        break;
    }

    event.preventDefault();
  }
}, false);