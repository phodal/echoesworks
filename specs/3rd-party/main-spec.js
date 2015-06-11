describe("Github", function () {
	var EW = new EchoesWorks();

	beforeEach(function () {
		jasmine.clock().install();
	});
	afterEach(function () {
		jasmine.clock().uninstall();
	});

	it("should return raw git url", function () {
		expect(EW.fn.convertURL("https://github.com/phodal/echoesworks")).toBe('https://rawgit.com/phodal/echoesworks');
		expect(EW.fn.convertURL("https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json"))
			.toBe('https://rawgit.com/phodal/echoesworks/master/bower.json');
	});
});

