describe("Parser", function () {
	var PARENT_TAG = 'slide',
		SLIDE_TAG = 'section',
		NO_OF_SLIDES = 10,
		article,
		slides,
		slide,
		ew;

	beforeEach(function () {
		slides = [];

		article = document.createElement(PARENT_TAG);
		for (var i = 0; i < NO_OF_SLIDES; i++) {
			slides.push(document.createElement(SLIDE_TAG));
			article.appendChild(slides[i]);
		}

		document.body.appendChild(article);

		ew = new EchoesWorks({element: 'slide', source: 'data/data.json'});

		jasmine.clock().install();
		jasmine.Ajax.install();
	});
	afterEach(function () {
		article.parentNode.removeChild(article);
		jasmine.clock().uninstall();
		jasmine.Ajax.uninstall();
	});

	it("parse data", function () {
		spyOn(ew.parser, 'parse');
		ew.parser();
		ew.parser.init('/data/data.json');
		//jasmine.clock().tick(300);
		//expect(ew.parser.parse).toHaveBeenCalled();
		//
		jasmine.Ajax.requests.mostRecent().respondWith({
			"status": 200,
			"contentType": 'text/plain',
			"responseText": '[{"time": "00:05.51","code": "https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json","word": "hello, world, next"}]'
		});
	});

	it("parse data correctly", function () {
		var data = [{
			"time": "00:05.51",
			"code": "https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json",
			"word": "hello, world, next"
		}];
		var result = ew.parser.parse(data);
		expect(result.words[0]).toBe("hello, world, next");
	});

	it("parse time correctly", function () {
		var result = ew.parser.parseTime(["00:05.51"]);
		expect(result[0]).toBe(5.5);
	});
});

