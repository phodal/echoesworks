window.onload = function(){
	EchoesWorks.get('data/example.md', function(data){
		var sections = EchoesWorks.md.parse(data);
		document.querySelector('slide').innerHTML = sections;
		EchoesWorks.imageHandler();
		new EchoesWorks({
			element: 'slide',
			source: 'data/data.json',
			auto: false
		});
	})
};
