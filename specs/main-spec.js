describe("Main", function () {
	var PARENT_TAG = 'slide',
		SLIDE_TAG = 'section',
		NO_OF_SLIDES = 10,
		article,
		slides,
		slide,
		EW;

	beforeEach(function () {
		slides = [];

		article = document.createElement(PARENT_TAG);
		for (var i = 0; i < NO_OF_SLIDES; i++) {
			slides.push(document.createElement(SLIDE_TAG));
			article.appendChild(slides[i]);
		}

		document.body.appendChild(article);

		EW = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: false
		});
		jasmine.clock().install();
	});

	afterEach(function () {
		jasmine.clock().uninstall();
	});

	it("should return element", function () {
		expect(EW.element).toBe('slide');
	});

	it("should return default element", function () {
		var ew = new EchoesWorks();
		expect(ew.element).toBe('slide');
	});

	it("should return respond logic", function () {
		EW.play();
		expect(EW.playing).toBeTruthy();
		EW.pause();
		expect(EW.playing).toBeFalsy();
		EW.play();
		EW.stop();
		expect(EW.playing).toBeFalsy();
	});

	it("should auto call update function", function () {
		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: false
		});
		ew.play();
		spyOn(ew, 'update');
		expect(ew.update).not.toHaveBeenCalled();
		jasmine.clock().tick(2000);
		expect(ew.update).toHaveBeenCalled();
	});

	it("should test time correctly", function () {
		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: false
		});
		ew.play();
		jasmine.clock().tick(2000);
		expect(ew.time).toBeGreaterThan(2);
	});

	it("should update code correctly", function () {
		spyOn(EchoesWorks, "get").and.returnValue({});

		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});
		spyOn(window.slide, 'next');
		spyOn(document, 'querySelector');
		ew.dataStatus = true;
		ew.data = {
			times: ["00:01.00", "00:01.30"],
			codes: ["https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json",
				"https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json"],
			words: ["hello, world"]
		};
		jasmine.clock().tick(2500);
		expect(window.slide.next).toHaveBeenCalled();
	});

});

