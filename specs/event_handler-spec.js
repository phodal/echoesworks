describe("EVent", function () {
	var PARENT_TAG = 'slide',
		SLIDE_TAG = 'section',
		NO_OF_SLIDES = 10,
		article,
		slides,
		slide,
		pre,
		code,
		words;

	beforeEach(function () {
		slides = [];

		article = document.createElement(PARENT_TAG);
		for (var i = 0; i < NO_OF_SLIDES; i++) {
			slides.push(document.createElement(SLIDE_TAG));
			slides.className = 'slide';
			article.appendChild(slides[i]);
		}

		pre = document.createElement('pre');
		code = document.createElement('code');
		words = document.createElement('words');

		document.body.appendChild(article);
		document.body.appendChild(pre);
		document.body.appendChild(code);
		document.body.appendChild(words);

		jasmine.Ajax.install();
		jasmine.clock().install();
	});

	function keyPress(key) {
		var event = document.createEvent('Event');
		event.keyCode = key;
		event.initEvent('keyup');
		document.dispatchEvent(event);
	}

	afterEach(function () {
		document.body.removeChild(article);
		document.body.removeChild(pre);
		document.body.removeChild(code);
		window.slide = null;
		jasmine.Ajax.uninstall();
		jasmine.clock().uninstall();
	});

	it("should return correctly slide when key press", function () {
		var UP = 40,
			DOWN = 38,
			ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});
		window.slide.slide(0);

		keyPress(UP);
		jasmine.clock().tick(100);
		expect(window.slide.slide()).toBe(1);
		keyPress(DOWN);

		jasmine.clock().tick(100);
		expect(window.slide.slide()).toBe(0);
	});


	function touchTrigger(element, eventName, touches) {
		var event = document.createEvent('Event');
		event.initEvent(eventName);
		event.touches = [touches];
		element[0].dispatchEvent(event);
	}

	it("should return correctly slide when swipe left & right", function () {
		window.ontouchstart = true;
		var ew = new EchoesWorks({
				element: 'slide',
				source: 'data/data.json',
				auto: true
			});
		slides = document.getElementsByTagName('section');
		window.slide.slide(0);

		touchTrigger(slides, 'touchstart', { pageX: 400, pageY: 900});
		touchTrigger(slides, 'touchmove', { pageX: 1440, pageY: 900});
		jasmine.clock().tick(100);
		expect(window.slide.slide()).toBe(1);

		touchTrigger(slides, 'touchstart', { pageX: 1440, pageY: 900});
		touchTrigger(slides, 'touchmove', { pageX: 400, pageY: 900});
		jasmine.clock().tick(100);
		expect(window.slide.slide()).toBe(0);
	});

	it("should return correctly slide when swipe top & bottom", function () {
		window.ontouchstart = true;
		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});
		slides = document.getElementsByTagName('section');
		window.slide.slide(0);

		touchTrigger(slides, 'touchstart', { pageX: 1440, pageY: 300});
		touchTrigger(slides, 'touchmove', { pageX: 1440, pageY: 900});
		jasmine.clock().tick(100);
		expect(window.slide.slide()).toBe(1);

		touchTrigger(slides, 'touchstart', { pageX: 1440, pageY: 900});
		touchTrigger(slides, 'touchmove', { pageX: 1440, pageY: 300});
		jasmine.clock().tick(100);
		expect(window.slide.slide()).toBe(0);
	});

});

