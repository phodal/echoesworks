(function(root, undefined) {

  "use strict";

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
	this.data = [];
	this.fps = 10;
	this.time = 0;
	if(this.options.auto) {
		this.play();
	}
	this.init();
};

EchoesWorks.prototype.init = function () {
	var that = this;

	that.slide();
	EchoesWorks.triggerEvent("ew:slide:init");

	if (window.slide) {
		window.slide.auto = that.options.auto;
		that.parser();
		setInterval(function () {
			that.update();
		}, 1000 / this.fps);
	}
};

EchoesWorks.prototype.stop = function () {
	console.log("total time:", this.time);
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

function showCode(that, currentSlide) {
	var url = EchoesWorks.fn.rawGitConvert(that.data.codes[currentSlide]);
	EchoesWorks.get(url, function (response) {
		document.querySelector('pre').innerHTML = response;
		document.querySelector('slide').classList.remove('full');
		document.querySelector('code').classList.remove('hidden');
	});
}

function hiddenCode() {
	document.querySelector('slide').classList.add('full');
	document.querySelector('code').classList.add('hidden');
}

EchoesWorks.prototype.applyEchoes = function () {
	var that = this;
	var isDataValid = that.parser.data && that.parser.data.codes !== undefined && that.parser.data.codes.length > 0;
	if (isDataValid) {
		that.data = that.parser.data;
		var times = that.parser.parseTime(that.data.times);
		var currentSlide = window.slide.slide();

		if (parseFloat(that.time) > times[currentSlide] && window.slide.auto) {
			window.slide.next();
			if(that.data.codes[currentSlide]){
				showCode(that, currentSlide);
			} else {
				hiddenCode();
			}
		}
	}
};


EchoesWorks.version = EchoesWorks.VERSION = '0.1.1';

root.EchoesWorks = EchoesWorks;
root.EW = EchoesWorks;

/*     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 *     Underscore may be freely distributed under the MIT license.
 */

EchoesWorks.isObject = function (obj) {
	var type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
};

EchoesWorks.isFunction = function (obj) {
	return typeof obj == 'function' || false;
};

EchoesWorks.defaults = function (obj) {
	if (!EchoesWorks.isObject(obj)) {
		return obj;
	}

	for (var i = 1, length = arguments.length; i < length; i++) {
		var source = arguments[i];
		for (var prop in source) {
			if (obj[prop] === void 0) {
				obj[prop] = source[prop];
			}
		}
	}
	return obj;
};

EchoesWorks.extend = function (obj) {
	if (!EchoesWorks.isObject(obj)) {
		return obj;
	}
	var source, prop;
	for (var i = 1, length = arguments.length; i < length; i++) {
		source = arguments[i];
		for (prop in source) {
			if (hasOwnProperty.call(source, prop)) {
				obj[prop] = source[prop];
			}
		}
	}
	return obj;
};

EchoesWorks.triggerEvent = function (eventName) {
	var event = document.createEvent('Event');
	event.initEvent(eventName, true, true);
	document.dispatchEvent(event);
};

/*! foreach.js v1.1.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/foreach */
EchoesWorks.forEach = function (collection, callback, scope) {
	if (Object.prototype.toString.call(collection) === '[object Object]') {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection);
			}
		}
	} else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, collection[i], i, collection);
		}
	}
};

EchoesWorks.get = function (url, callback) {
    EchoesWorks.send(url, 'GET', callback);
};

EchoesWorks.load = function (url, callback) {
    EchoesWorks.send(url, 'GET', callback);
};

EchoesWorks.post = function (url, data, callback) {
    EchoesWorks.send(url, 'POST', callback, data);
};

EchoesWorks.send = function (url, method, callback, data) {
    data = data || null;
    var request = new XMLHttpRequest();
    if (callback instanceof Function) {
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
                callback(request.responseText);
            }
        };
    }
    request.open(method, url, true);
    request.send(data);
};


/*!
 * Bespoke.js v1.0.0
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

/*jshint -W030 */

var from = function () {

	var element = this.options.element,
		parent = element.nodeType === 1 ? element : document.querySelector(element),
		slides = [].filter.call(parent.children, function (el) {
			return el.nodeName !== 'SCRIPT';
		}),
		activeSlide = slides[0],
		listeners = {},

		readURL = function () {
			var hash = window.location.hash,
				current = hash.replace(/#|\//gi, '');

			if (current > 0) {
				activate(current);
			} else {
				activate(0);
			}
		},

		activate = function (index, customData) {
			if (!slides[index]) {
				return;
			}

			activeSlide.className = activeSlide.className.replace(new RegExp('active' + '(\\s|$)', 'g'), ' ').trim();
			fire('deactivate', createEventData(activeSlide, customData));
			activeSlide = slides[index];
			activeSlide.classList.add('active');
			if(index === 0) {
				activeSlide.classList.add('first');
			}
			window.bar.go(100 * ( index + 1) / slides.length);
			writeURL(index);
			fire('activate', createEventData(activeSlide, customData));
		},

		slide = function (index, customData) {
			if (arguments.length) {
				fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
			} else {
				return slides.indexOf(activeSlide);
			}
		},

		writeURL = function (index) {
			window.location.hash = '#/' + index;
		},

		step = function (offset, customData) {
			var slideIndex = slides.indexOf(activeSlide) + offset;

			fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
		},

		on = function (eventName, callback) {
			(listeners[eventName] || (listeners[eventName] = [])).push(callback);

			return function () {
				listeners[eventName] = listeners[eventName].filter(function (listener) {
					return listener !== callback;
				});
			};
		},

		fire = function (eventName, eventData) {
			return (listeners[eventName] || [])
				.reduce(function (notCancelled, callback) {
					return notCancelled && callback(eventData) !== false;
				}, true);
		},

		createEventData = function (el, eventData) {
			eventData = eventData || {};
			eventData.index = slides.indexOf(el);
			eventData.slide = el;
			return eventData;
		},

		deck = {
			on: on,
			fire: fire,
			slide: slide,
			next: step.bind(null, 1),
			prev: step.bind(null, -1),
			parent: parent,
			slides: slides,
			auto: false
		};

	readURL();
	window.slide = deck;

	return deck;
};

EchoesWorks.prototype = EchoesWorks.extend(EchoesWorks.prototype, {slide: from});

var parser = function () {
	var that = this;
	if(that.source){
		parser.init(that.source);
	}
};

parser.data = [];

parser.init = function (source) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
			parser.parse(JSON.parse(request.responseText));
		}
	};

	request.open('GET', source, true);
	request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	request.send();
};

parser.parse = function (data) {
	var times = [],
		codes = [],
		words = [],
		results;

	function callback(element) {
		times.push(element.time);
		codes.push(element.code);
		words.push(element.word);
	}

	data.forEach(callback);
	results = {
		times: times,
		codes: codes,
		words: words
	};
	parser.data = results;
	return results;
};

parser.parseTime = function(times) {
	var pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
		result = [];

	times.forEach(function(v1) {
		var t = v1.slice(1, -1).split(':');
		var value = v1.replace(pattern, '');
		result.push([parseFloat(t[0]) * 60 + parseFloat(t[1]), value][0]);
	});
	return result;
};

EchoesWorks.prototype = EchoesWorks.extend(EchoesWorks.prototype, {parser: parser});


/*
 * micro-markdown.js
 * markdown in under 5kb
 *
 * Copyright 2014, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://simon.waldherr.eu/license/mit/
 *
 * Github:  https://github.com/simonwaldherr/micromarkdown.js/
 * Version: 0.3.0
 */

/*jshint strict: true */
var micromarkdown = {
	regexobject: {
		headline: /^(\#{1,6})([^\#\n]+)$/m,
		pre: /\s\`\`\`(\w+)\n?[^`]+\`\`\`/g,
		code: /\s\`\`\`\n?([^`]+)\`\`\`/g,
		hr: /^(?:([\*\-_] ?)+)\1\1$/gm,
		lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+)\n)+/gm,
		bolditalic: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/g,
		links: /!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g,
		reflinks: /\[([^\]]+)\]\[([^\]]+)\]/g,
		smlinks: /\@([a-z0-9]{3,})\@(t|gh|fb|gp|adn)/gi,
		mail: /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
		tables: /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g,
		include: /[\[<]include (\S+) from (https?:\/\/[a-z0-9\.\-]+\.[a-z]{2,9}[a-z0-9\.\-\?\&\/]+)[\]>]/gi,
		url: /<([a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)>/g
	},

	codeHandler: function (stra, str) {
		var pre='', preClass;
		if((preClass = this.regexobject.pre.exec(stra)) !== null){
			pre = preClass[1];
		}

		return str.replace(stra[0], '<pre><code class="' + pre + '">\n' + micromarkdown.htmlEncode(stra[1]).replace(pre + '\n', '').replace(/\n/gm, '<br/>').replace(/\ /gm, '&nbsp;') + '</code></pre>\n');
	},

	headlineHandler: function (stra, str) {
		var count = stra[1].length;
		return str.replace(stra[0], '<h' + count + '>' + stra[2] + '</h' + count + '>' + '\n');
	},

	linksHandler: function (stra, str, strict) {
		if (stra[0].substr(0, 1) === '!') {
			str = str.replace(stra[0], '<img src="' + stra[2] + '" alt="' + stra[1] + '" title="' + stra[1] + '" />\n');
		} else {
			str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(stra[2], strict) + 'href="' + stra[2] + '">' + stra[1] + '</a>\n');
		}
		return str;
	},
	mailHandler: function (stra, str) {
		return str.replace(stra[0], '<a href="mailto:' + stra[1] + '">' + stra[1] + '</a>');
	},
	hrHandler: function (stra, str) {
		return str.replace(stra[0], '\n<hr/>\n');
	},
	urlHandler: function (stra, str, strict) {
		var repString = stra[1];
		if (repString.indexOf('://') === -1) {
			repString = 'http://' + repString;
		}
		return str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repString, strict) + 'href="' + repString + '">' + repString.replace(/(https:\/\/|http:\/\/|mailto:|ftp:\/\/)/gmi, '') + '</a>');
	},
	refLinksHandler: function (str, stra, helper, strict) {
		return str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(helper[1], strict) + 'href="' + helper[1] + '">' + stra[1] + '</a>');
	},
	smlinksHandler: function (stra, str, strict) {
		var repstr = "";
		switch (stra[2]) {
			case 't':
				repstr = 'https://twitter.com/' + stra[1];
				break;
			case 'gh':
				repstr = 'https://github.com/' + stra[1];
				break;
			case 'fb':
				repstr = 'https://www.facebook.com/' + stra[1];
				break;
			case 'gp':
				repstr = 'https://plus.google.com/+' + stra[1];
				break;
		}
		return str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repstr, strict) + 'href="' + repstr + '">' + stra[1] + '</a>');
	},
	boldItalicHandler: function (stra, str) {
		var repstr = [];
		if (stra[1] === '~~') {
			str = str.replace(stra[0], '<del>' + stra[2] + '</del>');
		} else {
			switch (stra[1].length) {
				case 1:
					repstr = ['<i>', '</i>'];
					break;
				case 2:
					repstr = ['<b>', '</b>'];
					break;
				case 3:
					repstr = ['<i><b>', '</b></i>'];
					break;
			}
			str = str.replace(stra[0], repstr[0] + stra[2] + repstr[1]);
		}
		return str;
	},
	tableHandlerHelper: function (helper, calign, strict) {
		var i;
		for (i = 0; i < helper.length; i++) {
			if (calign.length <= i) {
				calign.push(0);
			} else if ((calign[i].trimRight().slice(-1) === ':') && (strict !== true)) {
				if (calign[i][0] === ':') {
					calign[i] = 3;
				} else {
					calign[i] = 2;
				}
			} else if (strict !== true) {
				if (calign[i][0] === ':') {
					calign[i] = 1;
				} else {
					calign[i] = 0;
				}
			} else {
				calign[i] = 0;
			}
		}
	},
	tableHandler: function (helper1, i, calign, repstr, cel) {
		var j, helper2;
		helper2 = helper1[i].split('|');
		if (helper2[0].length !== 0) {
			while (calign.length < helper2.length) {
				calign.push(0);
			}
			repstr += '<tr>';
			for (j = 0; j < helper2.length; j++) {
				repstr += cel[calign[j]] + helper2[j].trim() + '</td>';
			}
			repstr += '</tr>' + '\n';
		}
		return {helper2: helper2, repstr: repstr};
	},

	tablesHandler: function (stra, str, strict) {
		var repstr, cel, helper, calign, helper1, helper2, i;

		repstr = '<table><tr>';
		helper = stra[1].split('|');
		calign = stra[4].split('|');
		this.tableHandlerHelper(helper, calign, strict);
		cel = ['<th>', '<th align="left">', '<th align="right">', '<th align="center">'];
		for (i = 0; i < helper.length; i++) {
			repstr += cel[calign[i]] + helper[i].trim() + '</th>';
		}
		repstr += '</tr>';
		cel = ['<td>', '<td align="left">', '<td align="right">', '<td align="center">'];
		helper1 = stra[7].split('\n');
		for (i = 0; i < helper1.length; i++) {
			var result = this.tableHandler(helper1, i, calign, repstr, cel);
			helper2 = result.helper2;
			repstr = result.repstr;
		}
		repstr += '</table>';
		return str.replace(stra[0], repstr);
	},

	listHandlerStart: function (stra, repstr) {
		if ((stra[0].trim().substr(0, 1) === '*') || (stra[0].trim().substr(0, 1) === '-')) {
			repstr = '<ul>';
		} else {
			repstr = '<ol>';
		}
		return repstr;
	},

	listsHandlerEnd: function (stra, repstr) {
		if ((stra[0].trim().substr(0, 1) === '*') || (stra[0].trim().substr(0, 1) === '-')) {
			repstr += '</ul>';
		} else {
			repstr += '</ol>';
		}
		return repstr;
	}, listsHandlerSub: function (line, repstr, helper1) {
		if ((line[0].trim().substr(0, 1) === '*') || (line[0].trim().substr(0, 1) === '-')) {
			repstr += '<ul>';
			helper1.push('</ul>');
		} else {
			repstr += '<ol>';
			helper1.push('</ol>');
		}
		return repstr;
	},

	listHandler: function (line, nstatus, status, repstr, helper1, casca) {
		var indent = false;
		if ((line[2] === undefined) || (line[2].length === 0)) {
			nstatus = 0;
		} else {
			if (indent === false) {
				indent = line[2].replace(/\t/, '    ').length;
			}
			nstatus = Math.round(line[2].replace(/\t/, '    ').length / indent);
		}
		while (status > nstatus) {
			repstr += helper1.pop();
			status--;
			casca--;
		}
		while (status < nstatus) {
			repstr = this.listsHandlerSub(line, repstr, helper1);
			status++;
			casca++;
		}
		repstr += '<li>' + line[6] + '</li>' + '\n';
		return {nstatus: nstatus, status: status, repstr: repstr, casca: casca};
	},

	listsHandler: function (stra, str) {
		var helper, helper1 = [], status = 0, line, nstatus, repstr, i, casca = 0;
		repstr = this.listHandlerStart(stra, repstr);
		helper = stra[0].split('\n');
		for (i = 0; i < helper.length; i++) {
			if ((line = /^((\s*)((\*|\-)|\d(\.|\))) ([^\n]+))/.exec(helper[i])) !== null) {
				var result = this.listHandler(line, nstatus, status, repstr, helper1, casca);
				nstatus = result.nstatus;
				status = result.status;
				repstr = result.repstr;
				casca = result.casca;
			}
		}
		while (casca > 0) {
			repstr += '</ul>';
			casca--;
		}
		repstr = this.listsHandlerEnd(stra, repstr);
		return str.replace(stra[0], repstr + '\n');
	},

	listStrict: function (strict, regexobject) {
		if (strict !== true) {
			regexobject.lists = /^((\s*(\*|\d\.) [^\n]+)\n)+/gm;
		}
		return regexobject.lists;
	},
	removeRefLinks: function (trashgc, str) {
		var i;
		for (i = 0; i < trashgc.length; i++) {
			str = str.replace(trashgc[i], '');
		}
		return str;
	},

	parse: function (str, strict) {
		var helper, helper1, stra, trashgc = [], i, that = this, regexobject = micromarkdown.regexobject;
		regexobject.lists = this.listStrict(strict, regexobject);

		str = '\n' + str + '\n';
		['code', 'headline', 'lists', 'tables', 'links', 'mail', 'url', 'smlinks', 'hr'].forEach(function(type){
			while((stra = regexobject[type].exec(str)) !== null) {
				str = that[(type + 'Handler')].apply(that, [stra, str, strict]);
			}
		});

		for (i = 0; i < 3; i++) {
			while ((stra = regexobject.bolditalic.exec(str)) !== null) {
				str = this.boldItalicHandler(stra, str);
			}
		}

		while ((stra = regexobject.reflinks.exec(str)) !== null) {
			helper1 = new RegExp('\\[' + stra[2] + '\\]: ?([^ \n]+)', "gi");
			if ((helper = helper1.exec(str)) !== null) {
				str = this.refLinksHandler(str, stra, helper, strict);
				trashgc.push(helper[0]);
			}
		}

		str = this.removeRefLinks(trashgc, str);
		return str.replace(/ {2,}[\n]{1,}/gmi, '<br/><br/>');
	},

	htmlEncode: function (str) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	},

	mmdCSSclass: function (str, strict) {
		var urlTemp;
		if ((str.indexOf('/') !== -1) && (strict !== true)) {
			urlTemp = str.split('/');
			if (urlTemp[1].length === 0) {
				urlTemp = urlTemp[2].split('.');
			} else {
				urlTemp = urlTemp[0].split('.');
			}
			return 'class="mmd_' + urlTemp[urlTemp.length - 2].replace(/[^\w\d]/g, '') + urlTemp[urlTemp.length - 1] + '" ';
		}
		return '';
	}
};

EchoesWorks.md = micromarkdown;

var headerHandler = function() {
	var headers = document.querySelectorAll('.header h1');
	EchoesWorks.forEach(headers, function(header, index){
		var head = document.createElement('h1');
		var section = header.parentNode.parentNode;
		head.innerHTML = header.innerHTML;
		section.insertBefore(head, section.firstChild);
		header.parentNode.removeChild(headers[index]);
	});
};

var imageHandler = function (sections) {
	var images = document.getElementsByTagName('img');
	EchoesWorks.forEach(images, function (image) {
		var imageSrc = image.src;
		var imageType = image.title;
		if (imageType === 'background') {
			imageHandler.backgroundHandler(image, imageSrc, imageType);
		} else {
			if (imageType === 'left') {
				imageHandler.directionHandler(image, imageType, imageSrc, 'right');
			} else if (imageType === 'right') {
				imageHandler.directionHandler(image, imageType, imageSrc, 'left');
			}
			headerHandler();
		}
	});
	imageHandler.removeImages();
	return sections;
};

imageHandler.directionHandler = function (image, imageType, imageSrc, direction) {
	var parentNode = image.parentNode;
	var contentDiv = document.createElement('div');
	contentDiv.innerHTML = parentNode.innerHTML;
	contentDiv.className = direction;
	contentDiv.className += ' header';
	parentNode.innerHTML = '';
	parentNode.appendChild(contentDiv);

	var imageDiv = document.createElement('div');
	parentNode.appendChild(imageDiv);
	imageDiv.classList.add('image-' + imageType);
	imageDiv.width = 200;
	imageDiv.style.background = "url('" + imageSrc + "') no-repeat";
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



/* http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE */

var addCss, Bar, Nanobar, move, place, init,
	cssCont = {
		width: '100%',
		height: '4px',
		zIndex: 9999,
		bottom: '0'
	},
	cssBar = {
		width: 0,
		height: '100%',
		clear: 'both',
		transition: 'height .3s'
	};


addCss = function (el, css) {
	var i;
	for (i in css) {
		el.style[i] = css[i];
	}
	el.style.float = 'left';
};

move = function () {
	var self = this,
		dist = this.width - this.here;

	if (dist < 0.1 && dist > -0.1) {
		place.call(this, this.here);
		this.moving = false;
		if (this.width == 100) {
			this.el.style.height = 0;
			setTimeout(function () {
				self.cont.el.removeChild(self.el);
			}, 300);
		}
	} else {
		place.call(this, this.width - (dist / 4));
		setTimeout(function () {
			self.go();
		}, 16);
	}
};

place = function (num) {
	this.width = num;
	this.el.style.width = this.width + '%';
};

init = function () {
	var bar = new Bar(this);
	this.bars.unshift(bar);
};

Bar = function (cont) {
	this.el = document.createElement('div');
	this.el.style.backgroundColor = '#F44336';
	this.width = 0;
	this.here = 0;
	this.moving = false;
	this.cont = cont;
	addCss(this.el, cssBar);
	cont.el.appendChild(this.el);
};

Bar.prototype.go = function (num) {
	if (num) {
		this.here = num;
		if (!this.moving) {
			this.moving = true;
			move.call(this);
		}
	} else if (this.moving) {
		move.call(this);
	}
};


Nanobar = function () {
	this.bars = [];

	this.el = document.createElement('div');
	addCss(this.el, cssCont);
	this.el.style.position = 'fixed';
	document.getElementsByTagName('body')[0].appendChild(this.el);

	init.call(this);
};


Nanobar.prototype.go = function (p) {
	this.bars[0].go(p);
	if (p == 100) {
		init.call(this);
	}
};

var bar = new Nanobar();
window.bar = bar;

EchoesWorks.bar = bar;

var fn =  {};

EchoesWorks.fn = fn;

function rawGitConvert(url){
	var results = url.replace('github.com', 'rawgit.com');
	results = results.replace('raw.githubusercontent.com', 'rawgit.com');
	return results;
}

var Github = {
	rawGitConvert: rawGitConvert
};

EchoesWorks.fn = EchoesWorks.extend(EchoesWorks.fn, Github);

}(this));


/* global EchoesWorks */

/* istanbul ignore next */
/*jshint unused:false, eqnull:true */

(function (document) {
	'use strict';

	var TAB = 9,
		SPACE = 32,
		PAGE_DOWN = 34,
		LEFT = 37,
		RIGHT = 39,
		DOWN = 40,
		PAGE_UP = 33,
		UP = 38,
		slide;

	document.addEventListener("ew:slide:init", function () {

		document.addEventListener("keydown", function (event) {
			window.slide.auto = false;
			var keyCode = event.keyCode;
			if (keyCode === TAB || ( keyCode >= SPACE && keyCode <= PAGE_DOWN ) || (keyCode >= LEFT && keyCode <= DOWN)) {
				event.preventDefault();
			}
		}, false);

		document.addEventListener("keyup", function (event) {
			var keyCode = event.keyCode;
			if (keyCode === TAB || ( keyCode >= SPACE && keyCode <= PAGE_DOWN ) || (keyCode >= LEFT && keyCode <= DOWN)) {
				switch (keyCode) {
					case  PAGE_UP:
					case  LEFT:
					case  UP:
						window.slide.prev();
						break;
					case TAB:
					case SPACE:
					case PAGE_DOWN:
					case  RIGHT:
					case DOWN:
						window.slide.next();
						break;
				}

				event.preventDefault();
			}
		});
	});
}(document));