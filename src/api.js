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