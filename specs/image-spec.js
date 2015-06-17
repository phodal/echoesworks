describe("Image", function () {
	var section,
		image1, image2, image3,
		PARENT_TAG = 'slide',
		slides,
		slide,
		article,
		NO_OF_SLIDES = 10,
		SLIDE_TAG = 'section';

	beforeEach(function () {
		slides = [];

		article = document.createElement(PARENT_TAG);
		for (var i = 0; i < NO_OF_SLIDES; i++) {
			slides.push(document.createElement(SLIDE_TAG));
			slides.className = 'slide';
			article.appendChild(slides[i]);
		}

		section = document.createElement('section');
		image1 = document.createElement('img');
		image1.src = "app/background.jpg";
		image1.title = "background";

		image2 = document.createElement('img');
		image2.src = "app/left.jpg";
		image2.title = "left";

		image3 = document.createElement('img');
		image3.src = "app/right.jpg";
		image3.title = "right";

		var header = document.createElement('h1');
		header.innerHTML = "HELLO";

		section.appendChild(image1);
		section.appendChild(image2);
		section.appendChild(image3);
		section.appendChild(header);

		document.body.appendChild(article);
		document.body.appendChild(section);
	});

	it("should return element", function () {
		spyOn(EchoesWorks.imageHandler, 'removeImages');
		EchoesWorks.imageHandler();
		expect(EchoesWorks.imageHandler.removeImages).toHaveBeenCalled();
	});

	it("should return correctly image", function () {
		EchoesWorks.imageHandler();
		expect(document.getElementsByTagName('img').length).toBe(0);
		expect(document.querySelector('.image-left').style.backgroundImage)
			.toBe('url(http://0.0.0.0:8000/app/left.jpg)');

		expect(document.querySelector('.image-right').style.backgroundImage)
			.toBe('url(http://0.0.0.0:8000/app/right.jpg)');
	});

	it("should remove all images", function () {
		var images = document.getElementsByTagName('img');
		expect(images.length).toBe(3);
		EchoesWorks.imageHandler();
		expect(images.length).toBe(0);
	});

	it("should up h1", function () {
		expect(document.getElementsByTagName('section')[0].children[0].innerHTML).toBe('HELLO');
	});
});

