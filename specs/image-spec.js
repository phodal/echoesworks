describe("Image", function () {
	var section,
		image;

	beforeEach(function () {

		section = document.createElement('section');
		image = document.createElement('img');
		image.src = "app/background.jpg";
		image.title = "full";
		section.appendChild(image);
		document.body.appendChild(section);
	});

	it("should return element", function () {
		spyOn(EchoesWorks.imageHandler, 'removeImages');
		EchoesWorks.imageHandler();
		expect(EchoesWorks.imageHandler.removeImages).toHaveBeenCalled();
	});

});

