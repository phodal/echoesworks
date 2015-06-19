describe("Main", function () {
	var PARENT_TAG = 'slide',
		SLIDE_TAG = 'section',
		NO_OF_SLIDES = 10,
		article,
		slides,
		slide,
		pre,
		code,
		words,
		EW;

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

		EW = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: false
		});
		jasmine.Ajax.install();
		jasmine.clock().install();
	});

	afterEach(function () {
		document.body.removeChild(article);
		document.body.removeChild(pre);
		document.body.removeChild(code);
		window.slide = null;
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
		expect(document.querySelector('slide').className).toBe('');
		expect(document.querySelector('code').className).toBe('');
		expect(document.querySelector('words').className).toBe('');
	});

	it("should hidden code", function () {
		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});

		ew.parser.data = {
			times: ["00:01.20", "00:01.30", "00:02.30"],
			codes: [false, false, false],
			words: ["hello, world"]
		};

		jasmine.clock().tick(1500);
		expect(document.querySelector('slide').className).toBe('full');
		expect(document.querySelector('code').className).toBe('hidden');
		expect(document.querySelector('words').className).toBe('hidden');
	});

	it("should hidden words", function () {
		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});

		ew.parser.data = {
			times: ["00:01.20", "00:01.30", "00:02.30"],
			codes: [false, false, false],
			words: [[{"word": "Привет"}],
				[{"word": "Привет"},{"word": "Bonjour"}, {"word": "Hello, World"}, {"word": "213"}],""]
		};
		window.slide.slide(0);

		jasmine.clock().tick(1500);

		expect(document.querySelector('words').className).toBe('hidden');
		expect(document.querySelector('words').innerHTML).toBe('hello, world');
	});

	it("should return correctly localstorage", function () {
		var ew = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});

		ew.parser.data = {
			times: ["00:01.20", "00:01.30", "00:02.30"],
			codes: [false, false, false],
			words: [[{"word": "Привет"}],
				[{"word": "Привет"},{"word": "Bonjour"}, {"word": "Hello, World"}, {"word": "213"}],""]
		};
		window.slide.slide(0);

		jasmine.clock().tick(1500);
	});


});

