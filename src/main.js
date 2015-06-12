var EchoesWorks = function (options) {
	var defaults, self = this;
	defaults = {
		element: 'slide',
		source: 'data/data.json',
		auto: false
	};

	if(options === undefined) {
		console.log("Default Options is Empty, use default options...");
		options = {};
	}

	EchoesWorks.defaults(options, defaults);

	this.options = options;
	this.source = this.options.source;
	this.element = this.options.element;
	this.playing = this.options.auto;
	this.totalTime = 0;
	this.data = [];
	this.dataStatus = false;
	this.fps = 10;
	setInterval(function () {
		self.update();
	}, 1000 / this.fps);
	this.time = 0;
	this.init();
};

EchoesWorks.prototype.init = function () {
	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	var that = this;
	that.parser();
	if (typeof that.parser.data.times === 'object') {
		that.data = that.parser.data;
		that.dataStatus = true;
		var times = that.parser.parseTime(that.parser.data.times);
		that.totalTime = getMaxOfArray(times);
		EchoesWorks.triggerEvent("ew:slide:init");
	}
};

EchoesWorks.prototype.stop = function () {
	this.playing = false;
	this.time = 0;
};

EchoesWorks.prototype.pause = function () {
	this.playing = false;
};

EchoesWorks.prototype.play = function () {
	this.playing = true;
};

EchoesWorks.prototype.update = function () {
	if (this.playing) {
		this.time += 1 / this.fps;
	}
	this.applyEchoes();
};

EchoesWorks.prototype.applyEchoes = function () {
	var that = this;
	if (that.dataStatus && that.data) {
		var times = that.parser.parseTime(that.data.times);
		var currentSlide = window.slide.slide();

		if (parseFloat(that.time) > times[currentSlide]) {
			window.slide.next();
			if(that.data.codes[currentSlide]){
				var url = EchoesWorks.fn.rawGitConvert(that.data.codes[currentSlide]);
				EchoesWorks.get(url, function(data){
					document.querySelector('code').innerHTML = EchoesWorks.md.parse(data);
				});
			}
		}
	}
};


EchoesWorks.VERSION = '0.0.3';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;