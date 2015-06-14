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
		//var sections = document.getElementsByTagName('section');
		//spyOn(HTMLImageElement.prototype, 'remove');
		//console.log(sections);
		//EchoesWorks.imageHandler();
		//expect(HTMLImageElement.prototype.remove).toHaveBeenCalled();
	});

});

