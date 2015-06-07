var EchoesWorks = function(options) {
	if(!EchoesWorks.isObject(options)){
		options = {
			element: '#slide',
			source: 'data.json'
		};
	}

	this.options = options;
	this.source = this.options.source;
	this.element = this.options.element;
};

EchoesWorks.VERSION = '0.0.0';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;