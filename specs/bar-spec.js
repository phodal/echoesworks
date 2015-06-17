describe("Process Bar", function () {
	beforeEach(function () {
		jasmine.clock().install();
	});

	afterEach(function () {
		document.body.innerHTML = "";
		jasmine.clock().uninstall();
	});

	it("should return correct process width", function () {
		EchoesWorks.bar.go(30);
		jasmine.clock().tick(100);
		expect(bar.bars[0].moving).toBe(true);
		jasmine.clock().tick(400);
		expect(bar.bars[0].here).toBe(30);
		expect(bar.bars[0].moving).toBe(false);
	});

	it("should return 0 when go 100 ", function () {
		EchoesWorks.bar.go(99);
		jasmine.clock().tick(1000);
		expect(bar.bars[0].here).toBe(99);
		EchoesWorks.bar.go(100);
		jasmine.clock().tick(600);
		expect(bar.bars[0].here).toBe(0);
	});

});

