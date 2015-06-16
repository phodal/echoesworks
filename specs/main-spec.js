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

		var pre = document.createElement('pre');
		var code = document.createElement('code');
		code.className = 'show';

		document.body.appendChild(article);
		document.body.appendChild(pre);
		document.body.appendChild(code);

		EW = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: false
		});
		jasmine.Ajax.install();
		jasmine.clock().install();
	});

	afterEach(function () {
		jasmine.Ajax.uninstall();
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
		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});

		ew.parser.data = {
			times: ["00:01.20", "00:01.30", "00:02.30"],
			codes: ["https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json",
				"https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json", false],
			words: ["hello, world"]
		};

		spyOn(window.slide, 'next');

		jasmine.clock().tick(1500);
		expect(window.slide.next).toHaveBeenCalled();
		window.slide.auto = true;

		jasmine.Ajax.requests.mostRecent().respondWith({
			"status": 200,
			"contentType": 'text/plain',
			"responseText": '{}'
		});

	});

});

