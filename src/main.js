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
	this.playing = false;
	var self = this;
	this.fps = 30;
	setInterval(function() {
		self.update();
	}, 1000/this.fps);
	this.time = 0;
};

EchoesWorks.prototype.stop = function() {
	this.playing = false;
	this.time = 0;
};

EchoesWorks.prototype.pause = function() {
	this.playing = false;
};

EchoesWorks.prototype.play = function() {
	this.playing = true;
};

EchoesWorks.prototype.update = function() {
	if (this.playing) {
		this.time += 1/this.fps;
	}
};


EchoesWorks.VERSION = '0.0.0';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;