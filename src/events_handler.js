var TAB = 9,
	SPACE = 32,
	PAGE_DOWN = 34,
	LEFT = 37,
	RIGHT = 39,
	DOWN = 40,
	PAGE_UP = 33,
	UP = 38;

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

//var slide = new EchoesWorks.slide(EchoesWorks.element);

document.addEventListener("keyup", function ( event ) {
	var keyCode = event.keyCode;
	if ( isHandleKey(keyCode) ) {
		switch( keyCode ) {
			case  PAGE_UP:
			case  LEFT:
			case  UP:
				//slide.prev();
				break;
			case TAB:
			case SPACE:
			case PAGE_DOWN:
			case  RIGHT:
			case DOWN:
				//slide.next();
				break;
		}

		event.preventDefault();
	}
}, false);