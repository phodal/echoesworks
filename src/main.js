var EchoesWorks = function(options) {
	if(!EchoesWorks.isObject(options)){
		options = {
			element: 'slide',
			source: 'data/data.json'
		};
	}

	this.options = options;
	this.source = this.options.source;
	this.element = this.options.element;
	this.playing = false;
	this.totalTime = 0;
	var self = this;
	this.fps = 30;
	setInterval(function() {
		self.update();
	}, 1000/this.fps);
	this.time = 0;
	this.init();
};

EchoesWorks.prototype.init = function() {
	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	function triggerEvent (eventName) {
		var event = document.createEvent('Event');
		event.initEvent(eventName, true, true);
		document.dispatchEvent(event);
	}

	var that = this;
	that.parser();
	if(typeof that.parser.data.times === 'object'){
		var times = that.parser.parseTime(that.parser.data.times);
		that.totalTime = getMaxOfArray(times);
		triggerEvent("ew:slide:init");
	}
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
	this.applyEchoes();
};

EchoesWorks.prototype.applyEchoes = function() {

};


EchoesWorks.VERSION = '0.0.0';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;