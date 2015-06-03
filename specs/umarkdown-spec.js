describe("Main", function () {
	beforeEach(function () {

	});
	afterEach(function () {

	});

	it("should parse h1~h3", function () {
		expect(EW.md.parse("#Header1")).toBe("\n<h1>Header1</h1>\n\n");
		expect(EW.md.parse("##Header2")).toBe("\n<h2>Header2</h2>\n\n");
		expect(EW.md.parse("###Header3")).toBe("\n<h3>Header3</h3>\n\n");
	});

	it("should parse link", function () {
		expect(EW.md.parse("[phodal](http://www.phodal.com/)")).toBe('\n<a class="mmd_phodalcom" href="http://www.phodal.com/">phodal</a>\n\n');
		expect(EW.md.parse("[phodal][1]\n[1]: http://www.phodal.com/"))
			.toBe('\n<a class="mmd_phodalcom" href="http://www.phodal.com/">phodal</a>\n\n');
	});

	it("should special link", function () {
		expect(EW.md.parse("* Twitter @phodal@t"))
			.toBe('<ul><li>Twitter <a class="mmd_twittercom" href="https://twitter.com/phodal">phodal</a></li>\n</ul>\n');

		expect(EW.md.parse("* GitHub @phodal@gh"))
			.toBe('<ul><li>GitHub <a class="mmd_githubcom" href="https://github.com/phodal">phodal</a></li>\n</ul>\n');

		expect(EW.md.parse("* Facebook @phodal@fb"))
			.toBe('<ul><li>Facebook <a class="mmd_facebookcom" href="https://www.facebook.com/phodal">phodal</a></li>\n</ul>\n');

		expect(EW.md.parse("* Google+ @phodal@gp"))
			.toBe('<ul><li>Google+ <a class="mmd_googlecom" href="https://plus.google.com/+phodal">phodal</a></li>\n</ul>\n');
	});

	it("should parse font style", function () {
		expect(EW.md.parse("**bold** text")).toBe('\n<b>bold</b> text\n');
		expect(EW.md.parse("*italic* test")).toBe('\n<i>italic</i> test\n');
		expect(EW.md.parse("*italic and **bold** text*")).toBe('\n<i>italic and <b>bold</b> text</i>\n');
	});

	it("should parse code", function () {
		expect(EW.md.parse('```\nvar md   = document.getElementById("md").value```'))
			.toBe('<code>\nvar&nbsp;md&nbsp;&nbsp;&nbsp;=&nbsp;document.getElementById("md").value</code>\n\n');
	});

});

