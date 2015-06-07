/*!
 * Bespoke.js v1.0.0
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

describe("Slide", function () {
	var PARENT_TAG = 'slide',
		SLIDE_TAG = 'section',
		NO_OF_SLIDES = 10,
		article,
		slides,
		slide,
		EW;

	beforeEach(function() {
		slides = [];

		article = document.createElement(PARENT_TAG);
		for (var i = 0; i < NO_OF_SLIDES; i++) {
			slides.push(document.createElement(SLIDE_TAG));
			article.appendChild(slides[i]);
		}

		document.body.appendChild(article);

		EW = new EchoesWorks({element: 'slide'});
		slide = EW.slide();
	});

	afterEach(function() {
		document.body.removeChild(article);
	});

	it("should return true", function () {
		expect(EW.element).toBe('slide');
		slide.on();
	});
	
	describe("next", function() {
		
		it("should go to the next slide when not last slide", function() {
			slide.next();
			expect(slide.slide()).toBe(1);
		});
		
		it("should do nothing when on last slide", function() {
			slide.slide(9);
			slide.next();
			slide.next();
			expect(slide.slide()).toBe(9);
		});
		
		it("should do nothing when on last slide and not change any state", function() {
			slide.slide(9);
			slide.next();
			slide.next();
			slide.prev();
			expect(slide.slide()).toBe(8);
		});
		
		it("shouldn't activate the next slide if event handler activates an earlier slide while on last slide", function() {
			var activateAnotherSlide = function() { slide.slide(5); };
			
			slide.slide(slide.slides.length - 1);
			var off = slide.on("next", activateAnotherSlide);
			slide.next();
			
			expect(slide.slide()).toBe(5);
			
			off();
		});
		
		it("should merge the custom user payload with the event object", function() {
			var event;
			slide.on("next", function(e) {
				event = e;
			});
			slide.next({ foo: "bar" });
			
			expect(event.foo).toBe("bar");
		});
	});
});

