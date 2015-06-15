var imageHandler = function (sections) {
	var images = document.getElementsByTagName('img');
	EchoesWorks.forEach(images, function (image) {
		var imageSrc = image.src;
		var imageType = image.title;
		if (imageType === 'background') {
			imageHandler.backgroundHandler(image, imageSrc, imageType);
		} else if (imageType === 'left') {
			var block = document.createElement('div');
			var section = document.createElement('div');
			var node = image.parentNode;
			section.innerHTML = node.innerHTML;
			section.className = 'right';

			node.innerHTML = '';
			node.appendChild(block);
			node.appendChild(section);
			block.classList.add(imageType);
			block.style.background = "url('" + imageSrc + "') no-repeat center center";
		}
	});
	imageHandler.removeImages();
	return sections;
};

imageHandler.backgroundHandler = function (image, imageSrc, imageType) {
	image.parentNode.style.backgroundImage = "url('" + imageSrc + "')";
	image.parentNode.classList.add(imageType);
};

imageHandler.removeImages = function () {
	var element = document.getElementsByTagName("img"), index;
	for (index = element.length - 1; index >= 0; index--) {
		element[index].parentNode.removeChild(element[index]);
	}
};

EchoesWorks.imageHandler = imageHandler;

