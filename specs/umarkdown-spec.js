describe("Markdown", function () {
	beforeEach(function () {

	});
	afterEach(function () {

	});

	it("should parse h1~h3", function () {
		expect(EW.md.parse("#Header1")).toBe("\n<h1>Header1</h1>\n\n");
		expect(EW.md.parse("##Header2")).toBe("\n<h2>Header2</h2>\n\n");
		expect(EW.md.parse("###Header3")).toBe("\n<h3>Header3</h3>\n\n");
		expect(EW.md.parse("---")).toBe("\n\n<hr/>\n\n");
	});

	it("should parse link", function () {
		expect(EW.md.parse("[phodal](http://www.phodal.com/)"))
			.toBe('\n<a class="mmd_phodalcom" href="http://www.phodal.com/">phodal</a>\n\n');

		expect(EW.md.parse("![phodal](http://www.phodal.com/favicon.ico)"))
			.toBe('\n<img src="http://www.phodal.com/favicon.ico" alt="phodal" title="phodal" />\n\n');

		expect(EW.md.parse("<h@phodal.com>")).toBe('\n<a href="mailto:h@phodal.com">h@phodal.com</a>\n');

		expect(EW.md.parse("<http://www.phodal.com>"))
			.toBe('\n<a class="mmd_phodalcom" href="http://www.phodal.com">www.phodal.com</a>\n');

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
		expect(EW.md.parse("~~italic~~ test")).toBe('\n<del>italic</del> test\n');
		expect(EW.md.parse("*italic and **bold** text*")).toBe('\n<i>italic and <b>bold</b> text</i>\n');
	});

	it("should parse code", function () {
		expect(EW.md.parse('```\nvar md   = document.getElementById("md").value```'))
			.toBe('<pre><code>\nvar&nbsp;md&nbsp;&nbsp;&nbsp;=&nbsp;document.getElementById("md").value</code></pre>\n\n');
	});

	it("should parse ul list", function () {
		expect(EW.md.parse('* this\n* is a\n* list'))
			.toBe('<ul><li>this</li>\n<li>is a</li>\n<li>list</li>\n</ul>\n');

		expect(EW.md.parse('1. this\n2. is a'))
			.toBe('<ol><li>this</li>\n<li>is a</li>\n</ol>\n');

		expect(EW.md.parse('* this \n* is a\n  1. test\n  1. and\n  1. demo\n* list'))
			.toBe('<ul><li>this </li>\n<li>is a</li>\n<ol><li>test</li>\n<li>and</li>\n<li>demo</li>\n</ol><li>list</li>\n</ul>\n');
	});

	it("should parse ul table", function () {
		expect(EW.md.parse('this | is a   | table\n-----|--------|--------\nwith | sample | content'))
			.toBe('<table><tr><th>this</th><th>is a</th><th>table</th></tr><tr><td>with</td><td>sample</td><td>content</td></tr>\n</table>');

		expect(EW.md.parse('this | is a   | table\n-----:|:--------:|:--------\nwith | sample | content'))
			.toBe('<table><tr><th align="right">this</th><th align="center">is a</th><th align="left">table</th></tr><tr><td align="right">with</td><td align="center">sample</td><td align="left">content</td></tr>\n</table>');
	});

	it("should parse h1~h3", function () {
		expect(EW.md.mmdCSSclass('', '')).toBe('');
	});

});

