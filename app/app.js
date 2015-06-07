var EW = new EchoesWorks({element: 'slide'});
var slide = EW.slide();
slide.on();
slide.next();
console.log(slide.slide());

EchoesWorks.md.parse("----\n#hello");