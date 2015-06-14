var imageHandler = function (sections) {
	var images = document.getElementsByTagName('img');
	EchoesWorks.forEach(images, function (image) {
		if (image !== undefined) {
			var imageSrc = image.src;
			var imageType = image.title;
			image.parentNode.style.backgroundImage = "url('" + imageSrc + "')";
			image.parentNode.classList.add(imageType);
		}
	});
	imageHandler.removeImages();
	return sections;
};

imageHandler.removeImages = function () {
	var element = document.getElementsByTagName("img"), index;
	for (index = element.length - 1; index >= 0; index--) {
		element[index].parentNode.removeChild(element[index]);
	}
};

EchoesWorks.imageHandler = imageHandler;

