var EchoesWorks = function(options) {
	if(!EchoesWorks.isObject(options)){
		options = {
			element: '#slide'
		};
	}

	this.options = options;
	this.element = this.options.element;
};

EchoesWorks.VERSION = '0.0.0';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;