describe("Process Bar", function () {
	var bar;

	beforeEach(function () {
		jasmine.clock().install();
		bar = new EchoesWorks.bar();
	});

	afterEach(function () {
		jasmine.clock().uninstall();
	});

	it("should return correct process width", function () {
		bar.go(30);
		jasmine.clock().tick(100);
		expect(bar.bars[0].moving).toBe(true);
		jasmine.clock().tick(400);
		expect(bar.bars[0].here).toBe(30);
		expect(bar.bars[0].moving).toBe(false);
	});

	it("should return 0 when go 100 ", function () {
		bar.go(99);
		jasmine.clock().tick(1000);
		expect(bar.bars[0].here).toBe(99);
		bar.go(100);
		jasmine.clock().tick(600);
		expect(bar.bars[0].here).toBe(0);
	});

});

