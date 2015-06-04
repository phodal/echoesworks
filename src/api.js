/**
 * impress.js
 *
 * impress.js is a presentation tool based on the power of CSS3 transforms and transitions
 * in modern browsers and inspired by the idea behind prezi.com.
 *
 *
 * Copyright 2011-2012 Bartek Szopka (@bartaz)
 *
 * Released under the MIT and GPL Licenses.
 *
 * ------------------------------------------------
 * https://github.com/bartaz/impress.js/blob/6314e2e15012c9db69f76e77a8bb1c437a7312b8/js/impress.js
 */
	
var steps = [1 ,3] , activeStep, api;
api = {
	goto: function () {
		return "";
	},
	prev: function () {
		console.log("prev");
		var prev = steps.indexOf(activeStep) - 1;
		prev = prev >= 0 ? steps[prev] : steps[steps.length - 1];
		return this.goto(prev);
	},
	next: function () {
		console.log("next");
		var next = steps.indexOf(activeStep) + 1;
		next = next < steps.length ? steps[next] : steps[0];
		return this.goto(next);
	}
};

EchoesWorks.API = api;