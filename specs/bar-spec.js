describe("Process Bar", function () {
	var bar;

	beforeEach(function () {
		jasmine.clock().install();
		bar = new EchoesWorks.bar();
	});

	afterEach(function () {
		jasmine.clock().uninstall();
	});

	it("should return element", function () {
		bar.go(30);
		jasmine.clock().tick(100);
		expect(bar.bars[0].moving).toBe(true);
		jasmine.clock().tick(400);
		expect(bar.bars[0].here).toBe(30);
		expect(bar.bars[0].moving).toBe(false);
	});

});

