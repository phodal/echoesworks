
var parser = function () {
	var that = this;
	parser.init(that.source);
};

parser.init = function (source) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
			parser.parse(request.responseText);
		} else {

		}
	};

	request.open('GET', source, true);
	request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	request.send();
};

parser.parse = function(data) {
	
};

EchoesWorks.prototype = EchoesWorks.extend(EchoesWorks.prototype, {parser: parser});
