describe("Parser", function () {
	beforeEach(function () {
		jasmine.clock().install();
		jasmine.Ajax.install();
	});
	afterEach(function () {
		jasmine.clock().uninstall();
		jasmine.Ajax.uninstall();
	});

	it("parse data", function () {
		var ew = new EchoesWorks({element: 'slide', source: 'data/data.json'});
		//
		spyOn(ew.parser, 'parse');
		ew.parser.init('/data/data.json');
		//jasmine.clock().tick(300);
		//expect(ew.parser.parse).toHaveBeenCalled();
		//
		jasmine.Ajax.requests.mostRecent().respondWith({
			"status": 200,
			"contentType": 'text/plain',
			"responseText": '[{"time": "00:05.51",' +
			'"code": "https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json","word": "hello, world, next"}]'
		});
	});

	it("parse time", function () {
		var ew = new EchoesWorks({element: 'slide', source: 'data/data.json'});

		var result = ew.parser.parseTime(["00:05.51"]);
		expect(result[0][0]).toBe(5.5);
	});
});

