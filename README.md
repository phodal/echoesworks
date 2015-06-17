[![Build Status](https://travis-ci.org/phodal/echoesworks.svg?branch=master)](https://travis-ci.org/phodal/echoesworks)
[![Version](http://img.shields.io/npm/v/echoesworks.svg?style=flat)](http://http://img.shields.io/npm/v/echoesworks.svg)
[![Code Climate](https://codeclimate.com/github/phodal/echoesworks/badges/gpa.svg)](https://codeclimate.com/github/phodal/echoesworks)
[![Test Coverage](https://codeclimate.com/github/phodal/echoesworks/badges/coverage.svg)](https://codeclimate.com/github/phodal/echoesworks)
[![Node](https://img.shields.io/node/v/gh-badges.svg?style=flat)]()
[![npm](https://img.shields.io/npm/dm/echoesworks.svg?style=flat)]()
[![Bower](https://img.shields.io/bower/v/echoesworks.svg?style=flat)]()
[![LICENSE](https://img.shields.io/badge/license-MIT-green.svg?style=flat)]()

![Logo](app/logo_small.png)

#[EchoesWorks](http://www.echoesworks.com/)#

> Next-Generation Tech Blog/Presentation Framework

zh

> 下一代技术``博客``/``展示``框架
 
简介: [EchoesWorks —— 打造下一代技术Blog/Presentation 框架](http://www.phodal.com/blog/build-echoesworks/)
 
##Demo: [http://demo.echoesworks.com/](http://demo.echoesworks.com/) 
 
##Feature

###Core

- ``Markdown`` Presentation
- Integrate ``Github`` Code/Gist Code
- ``Full Screen`` Background Image
- Left/Right side Images Support
- Process Bar
- Auto Play
- Subtitles

zh

- 支持 Markdown
- 集成Github代码
- 全屏背景图片
- 左/右侧图片支持
- 进度条
- 自动播放
- 字幕

##Usage##

Clone

    git clone git@github.com:echoesworks/echoesworks-demo.git

``Or``

1.Install

    bower install echoesworks
    
2.Data

create ``example.md`` & ``data.json`` under ``data`` folder 
    
- Markdown Slide
- Data for code & Time Control     
    
3.Code    

     var EW = new EchoesWorks({
     		element: 'slide'
     	});

Example with slide

		EchoesWorks.get('data/example.md', function(data){
				document.querySelector('slide').innerHTML = EchoesWorks.md.parse(data);
				EchoesWorks.imageHandler();
				new EchoesWorks({
					element: 'slide'
				});
			})


##Setup Development##

1.Install devDependencies

     npm install

2.Development

3.Run Test

     npm test
      
4.Push Code & Waiting CI            

##Inspired by & Thanks to##

- Slide

    * [https://github.com/markdalgleish/bespoke.js](https://github.com/markdalgleish/bespoke.js)
    * [https://github.com/bartaz/impress.js](https://github.com/bartaz/impress.js)

- Markdown
    
    * [https://github.com/simonwaldherr/micromarkdown.js/](https://github.com/simonwaldherr/micromarkdown.js/)

- Time 
    
    * [https://github.com/vorg/timeline.js](https://github.com/vorg/timeline.js)

- Process Bar 
 
    * [https://github.com/jacoborus/nanobar](https://github.com/jacoborus/nanobar)

##License##

© 2015 [Phodal Huang](http://www.phodal.com). This code is distributed under the MIT license. See `LICENSE.txt` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/blog/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
