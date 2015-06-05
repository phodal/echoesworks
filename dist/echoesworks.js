(function(root, undefined) {

  "use strict";

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

/*     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*     Underscore may be freely distributed under the MIT license.
*/

EchoesWorks.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

EchoesWorks.isFunction = function(obj) {
    return typeof obj == 'function' || false;
};

EchoesWorks.defaults = function(obj) {
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
    if (data instanceof Object) {
        data = JSON.stringify(data);
        request.setRequestHeader('Content-Type', 'application/json');
    }
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
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
var from = function(selectorOrElement) {
	var parent = selectorOrElement.nodeType === 1 ? selectorOrElement : document.querySelector(selectorOrElement),
		slides = [].filter.call(parent.children, function(el) { return el.nodeName !== 'SCRIPT'; }),
		activeSlide = slides[0],
		listeners = {},

		activate = function(index, customData) {
			if (!slides[index]) {
				return;
			}

			fire('deactivate', createEventData(activeSlide, customData));
			activeSlide = slides[index];
			fire('activate', createEventData(activeSlide, customData));
		},

		slide = function(index, customData) {
			if (arguments.length) {
				fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
			} else {
				return slides.indexOf(activeSlide);
			}
		},

		step = function(offset, customData) {
			var slideIndex = slides.indexOf(activeSlide) + offset;

			fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
		},

		on = function(eventName, callback) {
			(listeners[eventName] || (listeners[eventName] = [])).push(callback);

			return function() {
				listeners[eventName] = listeners[eventName].filter(function(listener) {
					return listener !== callback;
				});
			};
		},

		fire = function(eventName, eventData) {
			return (listeners[eventName] || [])
				.reduce(function(notCancelled, callback) {
					return notCancelled && callback(eventData) !== false;
				}, true);
		},

		createEventData = function(el, eventData) {
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
			slides: slides
		};

	activate(0);

	return deck;
};

EchoesWorks.slide = from;

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

var micromarkdown = {
	regexobject: {
		headline: /^(\#{1,6})([^\#\n]+)$/m,
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

	codeFilter: function (str, stra) {
		return str.replace(stra[0], '<code>\n' + micromarkdown.htmlEncode(stra[1]).replace(/\n/gm, '<br/>').replace(/\ /gm, '&nbsp;') + '</code>\n');
	},

	headlinesFilter: function (stra, str) {
		var count = stra[1].length;
		return str.replace(stra[0], '<h' + count + '>' + stra[2] + '</h' + count + '>' + '\n');
	},

	linksFilter: function (stra, str, strict) {
		if (stra[0].substr(0, 1) === '!') {
			str = str.replace(stra[0], '<img src="' + stra[2] + '" alt="' + stra[1] + '" title="' + stra[1] + '" />\n');
		} else {
			str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(stra[2], strict) + 'href="' + stra[2] + '">' + stra[1] + '</a>\n');
		}
		return str;
	},
	mailFilter: function (str, stra) {
		return str.replace(stra[0], '<a href="mailto:' + stra[1] + '">' + stra[1] + '</a>');
	},
	horizontalLineFilter: function (str, stra) {
		str = str.replace(stra[0], '\n<hr/>\n');
		return str;
	},
	urlFilter: function (stra, str, strict) {
		var repString = stra[1];
		if (repString.indexOf('://') === -1) {
			repString = 'http://' + repString;
		}
		str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repString, strict) + 'href="' + repString + '">' + repString.replace(/(https:\/\/|http:\/\/|mailto:|ftp:\/\/)/gmi, '') + '</a>');
		return str;
	},
	refLinksFilter: function (str, stra, helper, strict) {
		return str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(helper[1], strict) + 'href="' + helper[1] + '">' + stra[1] + '</a>');
	},
	specialLinks: function (stra, str, strict) {
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
		str = str.replace(stra[0], '<a ' + micromarkdown.mmdCSSclass(repstr, strict) + 'href="' + repstr + '">' + stra[1] + '</a>');
		return str;
	},
	boldItalicFilter: function (stra, str) {
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
	tablesFilter: function (stra, strict, str) {
		var repstr, cel, helper, calign, helper1, helper2,
			i = 0,
			j = 0;

		repstr = '<table><tr>';
		helper = stra[1].split('|');
		calign = stra[4].split('|');
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
		cel = ['<th>', '<th align="left">', '<th align="right">', '<th align="center">'];
		for (i = 0; i < helper.length; i++) {
			repstr += cel[calign[i]] + helper[i].trim() + '</th>';
		}
		repstr += '</tr>';
		cel = ['<td>', '<td align="left">', '<td align="right">', '<td align="center">'];
		helper1 = stra[7].split('\n');
		for (i = 0; i < helper1.length; i++) {
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
		}
		repstr += '</table>';
		str = str.replace(stra[0], repstr);
		return str;
	},

	listFilter: function (stra, str) {
		var helper, helper1, status, indent, line, nstatus, repstr,
			i = 0,
			casca = 0;
		if ((stra[0].trim().substr(0, 1) === '*') || (stra[0].trim().substr(0, 1) === '-')) {
			repstr = '<ul>';
		} else {
			repstr = '<ol>';
		}
		helper = stra[0].split('\n');
		helper1 = [];
		status = 0;
		indent = false;
		for (i = 0; i < helper.length; i++) {
			if ((line = /^((\s*)((\*|\-)|\d(\.|\))) ([^\n]+))/.exec(helper[i])) !== null) {
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
					if ((line[0].trim().substr(0, 1) === '*') || (line[0].trim().substr(0, 1) === '-')) {
						repstr += '<ul>';
						helper1.push('</ul>');
					} else {
						repstr += '<ol>';
						helper1.push('</ol>');
					}
					status++;
					casca++;
				}
				repstr += '<li>' + line[6] + '</li>' + '\n';
			}
		}
		while (casca > 0) {
			repstr += '</ul>';
			casca--;
		}
		if ((stra[0].trim().substr(0, 1) === '*') || (stra[0].trim().substr(0, 1) === '-')) {
			repstr += '</ul>';
		} else {
			repstr += '</ol>';
		}
		str = str.replace(stra[0], repstr + '\n');
		return str;
	},

	parse: function (str, strict) {
		var helper, helper1, stra, trashgc = [], i;
		str = '\n' + str + '\n';

		var regexobject = micromarkdown.regexobject;
		if (strict !== true) {
			regexobject.lists = /^((\s*(\*|\d\.) [^\n]+)\n)+/gm;
		}

		while ((stra = regexobject.code.exec(str)) !== null) {
			str = this.codeFilter(str, stra);
		}

		while ((stra = regexobject.headline.exec(str)) !== null) {
			str = this.headlinesFilter(stra, str);
		}

		while ((stra = regexobject.lists.exec(str)) !== null) {
			str = this.listFilter(stra, str);
		}

		while ((stra = regexobject.tables.exec(str)) !== null) {
			str = this.tablesFilter(stra, strict, str);
		}

		for (i = 0; i < 3; i++) {
			while ((stra = regexobject.bolditalic.exec(str)) !== null) {
				str = this.boldItalicFilter(stra, str);
			}
		}

		while ((stra = regexobject.links.exec(str)) !== null) {
			str = this.linksFilter(stra, str, strict);
		}

		while ((stra = regexobject.mail.exec(str)) !== null) {
			str = this.mailFilter(str, stra);
		}

		while ((stra = regexobject.url.exec(str)) !== null) {
			str = this.urlFilter(stra, str, strict);
		}

		while ((stra = regexobject.reflinks.exec(str)) !== null) {
			helper1 = new RegExp('\\[' + stra[2] + '\\]: ?([^ \n]+)', "gi");
			if ((helper = helper1.exec(str)) !== null) {
				str = this.refLinksFilter(str, stra, helper, strict);
				trashgc.push(helper[0]);
			}
		}

		for (i = 0; i < trashgc.length; i++) {
			str = str.replace(trashgc[i], '');
		}
		while ((stra = regexobject.smlinks.exec(str)) !== null) {
			str = this.specialLinks(stra, str, strict);
		}

		while ((stra = regexobject.hr.exec(str)) !== null) {
			str = this.horizontalLineFilter(str, stra);
		}

		str = str.replace(/ {2,}[\n]{1,}/gmi, '<br/><br/>');
		return str;
	},

	htmlEncode: function (str) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		str = div.innerHTML;
		div = undefined;
		return str;
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

var TAB = 9,
	SPACE = 32,
	PAGE_DOWN = 34,
	LEFT = 37,
	RIGHT = 39,
	DOWN = 40,
	PAGE_UP = 33,
	UP = 38;

function isHandleKey(keyCode) {
	return keyCode === TAB || ( keyCode >= SPACE && keyCode <= PAGE_DOWN ) || (keyCode >= LEFT && keyCode <= DOWN);
}

EchoesWorks.handleInput = isHandleKey;

document.addEventListener("keydown", function ( event ) {
	var keyCode = event.keyCode;
	if ( isHandleKey(keyCode) ) {
		event.preventDefault();
	}
}, false);

//var slide = new EchoesWorks.slide(EchoesWorks.element);

document.addEventListener("keyup", function ( event ) {
	var keyCode = event.keyCode;
	if ( isHandleKey(keyCode) ) {
		switch( keyCode ) {
			case  PAGE_UP:
			case  LEFT:
			case  UP:
				//slide.prev();
				break;
			case TAB:
			case SPACE:
			case PAGE_DOWN:
			case  RIGHT:
			case DOWN:
				//slide.next();
				break;
		}

		event.preventDefault();
	}
}, false);

}(this));
