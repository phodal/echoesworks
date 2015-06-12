window.onload = function(){
	EchoesWorks.get('data/example.md', function(data){
		var sections = EchoesWorks.md.parse(data);
		document.querySelector('slide').innerHTML = sections;
		var EW = new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: true
		});
		EW.play();
	})
};
