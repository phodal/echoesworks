'use strict';

describe("Effect", function () {
    var ew, content, elementID = "content",
      PARENT_TAG = 'slide',
      slides,
      slide,
      article,
      NO_OF_SLIDES = 10,
      SLIDE_TAG = 'section';

    beforeEach(function () {
        slides = [];

        article = document.createElement(PARENT_TAG);
        for (var i = 0; i < NO_OF_SLIDES; i++) {
            slides.push(document.createElement(SLIDE_TAG));
            slides.className = 'slide';
            article.appendChild(slides[i]);
        }


        content = document.createElement('div');
        content.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.body.appendChild(article);
        document.getElementById(elementID).style.height = '4px';
        document.getElementById(elementID).style.opacity = 1;

        ew = new EchoesWorks();
        jasmine.clock().install();
    });

    afterEach(function(){
        jasmine.clock().uninstall();
    });

    it('should be able fadein elements', function () {
        var element = document.createElement('div');
        element.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.getElementById(elementID).style.height = '4px';
        document.getElementById(elementID).style.opacity = 0;

        ew.FX.fadeIn(document.getElementById(elementID), {
            duration: 1000, complete: function () {
            }
        });

        jasmine.clock().tick(1000);
        var opacity = document.getElementById(elementID).style.opacity;
        opacity = Math.round(opacity);
        expect(opacity).toEqual(0);
    });

    it('should be able fadeout elements', function () {
        var element = document.createElement('div');
        element.setAttribute("id", elementID);
        document.body.appendChild(content);
        document.getElementById(elementID).style.height = '4px';
        document.getElementById(elementID).style.opacity = 0;

        ew.FX.fadeOut(document.getElementById(elementID), {
            duration: 1000, complete: function () {
            }
        });

        jasmine.clock().tick(1000);
        var opacity = document.getElementById(elementID).style.opacity;
        opacity = Math.round(opacity);
        expect(opacity).toEqual(1);
    });

    describe(" Animation", function(){
        it('should return progress equal 1', function () {
            var to = 2;
            var options = {
                duration: 0.2, complete: function () {
                }
            };
            var element = document.createElement('div');
            element.setAttribute("id", elementID);
            document.body.appendChild(content);
            document.getElementById(elementID).style.height = '4px';
            document.getElementById(elementID).style.opacity = 0;

            ew.FX.animate({
                duration: options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    var prog = ew.FX.easing.linear(progress);
                    return prog;
                },
                complete: options.complete,
                step: function (delta) {
                    element.style.opacity = to - delta;
                }
            });
        });
    });

    describe("Effect Easing", function () {
        it('linear: should return it self', function () {
            var origin = 1, now;
            now = ew.FX.easing.linear(origin);
            expect(now).toEqual(1);
        });

        it('quadratic: should return it self', function () {
            var origin = 2, now;
            now = ew.FX.easing.quadratic(origin);
            expect(now).toEqual(4);
        });

        it('circ: should return it self', function () {
            var origin = 1.0, now;
            now = ew.FX.easing.circ(origin);
            expect(now).toEqual(1);
        });

        it('back: should return it self', function () {
            var origin = 2, now;
            now = ew.FX.easing.back(origin, origin);
            expect(now).toEqual(16);
        });

        it('bounce: should return it self', function () {
            var origin = 2, now;
            now = ew.FX.easing.bounce(origin);
            expect(now).toEqual(-6.5625);
        });

        it('elastic: should return it self', function () {
            var origin = 2, now;
            now = ew.FX.easing.elastic(origin, origin);
            now = Math.round(now);
            expect(now).toEqual(-512);
        });
    });
});
