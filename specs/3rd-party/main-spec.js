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
	});
});

