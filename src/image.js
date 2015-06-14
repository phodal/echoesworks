var imageHandler = function (sections) {
	var images = document.getElementsByTagName('img');
	EchoesWorks.forEach(images, function (image) {
		if (image !== undefined) {
			var imageSrc = image.src;
			var imageType = image.title;
			image.parentNode.style.backgroundImage = "url('" + imageSrc + "')";
			image.parentNode.classList.add(imageType);
			image.remove();
		}
	});
	return sections;
};

EchoesWorks.imageHandler = imageHandler;

