[![Build Status](https://travis-ci.org/phodal/echoesworks.svg?branch=master)](https://travis-ci.org/phodal/echoesworks)
[![Version](http://img.shields.io/npm/v/echoesworks.svg?style=flat)](http://http://img.shields.io/npm/v/echoesworks.svg)
[![Code Climate](https://codeclimate.com/github/phodal/echoesworks/badges/gpa.svg)](https://codeclimate.com/github/phodal/echoesworks)
[![Test Coverage](https://codeclimate.com/github/phodal/echoesworks/badges/coverage.svg)](https://codeclimate.com/github/phodal/echoesworks)
[![Node](https://img.shields.io/node/v/gh-badges.svg?style=flat)]()
[![npm](https://img.shields.io/npm/dm/echoesworks.svg?style=flat)]()
[![Bower](https://img.shields.io/bower/v/echoesworks.svg?style=flat)]()
[![LICENSE](https://img.shields.io/badge/license-MIT-green.svg?style=flat)]()

# [EchoesWorks](http://www.echoesworks.com/)

> Next-Generation Tech Blog/Presentation Framework
 
- Timer Audio
- Timer subtitles
- Markdown Presentation
- Integrate Github Code/Gist Code
- Time Control

##Usage

     var EW = new EchoesWorks({
     		element: 'slide',
     		source: 'data/data.json'
     	});

Example with slide

    window.onload = function(){
      EchoesWorks.get('data/example.md', function(data){
        var sections = EchoesWorks.md.parse(data);
        document.querySelector('slide').innerHTML = sections;
        new EchoesWorks({
          element: 'slide',
          source: 'data/data.json'
        });
      })
    };


##Setup Development

1.Install devDependencies

     npm install

2.Development

3.Run Test

     npm test
      
4.Push Code & Waiting CI            

##Inspired by & Thanks to

slide:

 - [https://github.com/markdalgleish/bespoke.js](https://github.com/markdalgleish/bespoke.js)
 - [https://github.com/bartaz/impress.js](https://github.com/bartaz/impress.js)

markdown: [https://github.com/simonwaldherr/micromarkdown.js/](https://github.com/simonwaldherr/micromarkdown.js/)

time: [https://github.com/vorg/timeline.js](https://github.com/vorg/timeline.js)

## License

MIT. See `LICENSE.txt` in this directory.

