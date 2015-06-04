var TAB = 9,
	SPACE = 32,
	PAGE_DOWN = 34,
	LEFT = 37,
	DOWN = 40;

function isHandleKey(keyCode) {
	return keyCode === TAB || ( keyCode >= SPACE && keyCode <= PAGE_DOWN ) || (keyCode >= LEFT && keyCode <= DOWN);
}

EchoesWorks.handleInput = isHandleKey;

document.addEventListener("keydown", function ( event ) {
	var keyCode = event.keyCode;
	if ( isHandleKey(keyCode) ) {
		event.preventDefault();
	}
}, false);

document.addEventListener("keyup", function ( event ) {
	var keyCode = event.keyCode;
	if ( isHandleKey(keyCode) ) {
		switch( keyCode ) {
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