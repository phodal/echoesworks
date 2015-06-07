/*!
 * Bespoke.js v1.0.0
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

/*jshint -W030 */
//
//var triggerEvent = function (eventName) {
//	var event = document.createEvent("CustomEvent");
//	event.initCustomEvent(eventName, true, true, {});
//};

var from = function() {
	var element =  this.options.element,
		parent = element.nodeType === 1 ? element : document.querySelector(element),
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
EchoesWorks.prototype = EchoesWorks.extend(EchoesWorks.prototype, {slide: from});