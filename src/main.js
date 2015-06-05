var EchoesWorks = function(options) {
	if(!EchoesWorks.isObject(options)){
		options = {};
	}
	var defaultOptions = {
		element: "#slide"
	};

	options = EchoesWorks.extend(options, defaultOptions);
	this.options = options;
	this.element = this.options.element;
	return true;
};

EchoesWorks.VERSION = '0.0.0';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;