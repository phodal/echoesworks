describe("Main", function () {
	var EW = new EchoesWorks();

	beforeEach(function () {
		jasmine.clock().install();
	});
	afterEach(function () {
		jasmine.clock().uninstall();
	});

	it("should return element", function () {
		expect(EW.element).toBe('slide');
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
		var ew = new EchoesWorks();
		ew.play();
		spyOn(ew, 'update');
		expect(ew.update).not.toHaveBeenCalled();
		jasmine.clock().tick(2000);
		expect(ew.update).toHaveBeenCalled();
	});

	it("should test time correctly", function () {
		var ew = new EchoesWorks();
		ew.play();
		jasmine.clock().tick(2000);
		expect(ew.time).toBeGreaterThan(2);
	});

});

