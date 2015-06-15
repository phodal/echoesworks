var EchoesWorks = function (options) {
	var defaults;
	defaults = {
		element: 'slide',
		auto: false
	};

	if(options === undefined) {
		console.log("Default Options is Empty, use default options...");
		options = {};
	}

	EchoesWorks.defaults(options, defaults);

	this.options = options;
	if(options.source){
		this.source = this.options.source;
	}
	this.element = this.options.element;
	this.playing = false;
	this.totalTime = 0;
	this.data = [];
	this.dataStatus = false;
	this.fps = 10;
	this.time = 0;
	if(this.options.auto) {
		this.play();
	}
	this.init();
};

EchoesWorks.prototype.init = function () {
	var that = this;

	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	that.slide();
	EchoesWorks.triggerEvent("ew:slide:init");

	if (window.slide) {
		setInterval(function () {
			that.update();
		}, 1000 / this.fps);

		that.parser();
		if (typeof that.parser.data.times === 'object') {
			console.log(that.parser.data.times);
			that.data = that.parser.data;
			that.dataStatus = true;
			var times = that.parser.parseTime(that.parser.data.times);
			that.totalTime = getMaxOfArray(times);
		}
	}
};

EchoesWorks.prototype.stop = function () {
	console.log("total time:", this.totalTime);
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
				EchoesWorks.get(url, function(response){
					document.querySelector('pre').innerHTML = response;
					document.querySelector('slide').classList.remove('full');
					document.querySelector('code').classList.remove('hidden');
				});
			} else {
				document.querySelector('slide').classList.add('full');
				document.querySelector('code').classList.add('hidden');
			}
		}
	}
};


EchoesWorks.version = EchoesWorks.VERSION = '0.1.0';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;