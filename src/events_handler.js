var TAB = 9,
	SPACE = 32,
	PAGE_DOWN = 34,
	LEFT = 37,
	RIGHT = 39,
	DOWN = 40,
	PAGE_UP = 33,
	UP = 38;

document.addEventListener("EchoesWorks", function (event) {
	"use strict";
	console.log(event);

	document.addEventListener("keydown", function (event) {
		var keyCode = event.keyCode;
		if (keyCode === TAB || ( keyCode >= SPACE && keyCode <= PAGE_DOWN ) || (keyCode >= LEFT && keyCode <= DOWN)) {
			event.preventDefault();
		}
	}, false);

	document.addEventListener("keyup", function (event) {
		var keyCode = event.keyCode;
		if (keyCode === TAB || ( keyCode >= SPACE && keyCode <= PAGE_DOWN ) || (keyCode >= LEFT && keyCode <= DOWN)) {
			switch (keyCode) {
				case  PAGE_UP:
				case  LEFT:
				case  UP:
					//EchoesWorks.slide.prev();
					break;
				case TAB:
				case SPACE:
				case PAGE_DOWN:
				case  RIGHT:
				case DOWN:
					//EchoesWorks.slide.next();
					break;
			}

			event.preventDefault();
		}
	}, false);
});