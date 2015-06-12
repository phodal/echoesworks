describe("Github", function () {
	beforeEach(function () {
		jasmine.clock().install();
	});
	afterEach(function () {
		jasmine.clock().uninstall();
	});

	it("should return raw git url", function () {
		expect(EchoesWorks.fn.rawGitConvert("https://github.com/phodal/echoesworks")).toBe('https://rawgit.com/phodal/echoesworks');
		expect(EchoesWorks.fn.rawGitConvert("https://raw.githubusercontent.com/phodal/echoesworks/master/bower.json"))
			.toBe('https://rawgit.com/phodal/echoesworks/master/bower.json');
	});
});

