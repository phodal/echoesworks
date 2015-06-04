describe("Main", function () {
	it("should return prev & next", function () {
		expect(EW.API.prev()).toBe("prev");
		expect(EW.API.next()).toBe("next");
	});
});

