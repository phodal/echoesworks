'use strict';

describe("Helper", function () {
    var ew = EchoesWorks;

    it("should be a object", function () {
        expect(ew.isObject([])).toEqual(true);
        expect(ew.isObject([{}])).toEqual(true);
    });

    it("should be a function", function () {
        var func = function () {};

        expect(ew.isFunction(func)).toEqual(true);
        expect(ew.isFunction("")).toEqual(false);
    });

    describe("Extend", function () {
        it("should be able to extend object", function () {
            expect(ew.extend({one: 1}, {two: 2})).toEqual({one: 1, two: 2});
            expect(ew.extend({two: 1}, {two: 2})).toEqual({two: 2});
        });

        it("should be unable to extend object when no a object", function () {
            var results = ew.extend("", {two: 2});
            expect(results).toEqual("");
        });
    });

    describe("Defaults", function () {
        it("should be return variable when same key", function () {
            var origin = {one: 1};
            var new_object = {one: 2};
            ew.defaults(origin, new_object);
            expect(origin).toEqual({one: 1});
        });

        it("should return empty string when defaults is empty string", function () {
            var emptyString = "";
            var defaults = {two: 2};
            ew.defaults(emptyString, defaults);
            expect(emptyString).toEqual("");
        });

        it("should return defaults when defaults is empty object", function () {
            var empty = {};
            var defaults = {two: 2};
            ew.defaults(empty, defaults);
            expect(empty).toEqual({two: 2});
        });
    });

});

/**
 * forEach.js
 */
/*! foreach.js v1.1.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/foreach */

describe('EchoesWorks.forEach', function () {
    describe('Array looping', function () {
        var myArray;
        beforeEach(function () {
            myArray = ['A', 'B', 'C', 'D'];
        });
        
        it('should pass the index', function () {
            EchoesWorks.forEach(myArray, function (value, index) {
                expect(index).toMatch(/[0-9]/);
            });
        });
        
        it('should pass the element', function () {
            EchoesWorks.forEach(myArray, function (value, index) {
                expect(value).toMatch(/[A-D]/);
            });
        });
        
    });
    
    /**
     * Object
     */
    describe('Object looping', function () {
        var myObject;
        beforeEach(function () {
            myObject = {testA: 'A', testB: 'B', testC: 'C', testD: 'D'};
        });
        
        it('should pass the value', function () {
            EchoesWorks.forEach(myObject, function (value, prop, obj) {
                expect(value).toMatch(/[A-D]/);
            });
        });
        
        it('should pass the property name', function () {
            EchoesWorks.forEach(myObject, function (value, prop, obj) {
                expect(prop).toMatch(/test[A-D]/);
            });
        });
        
        it('should pass the initial object', function () {
            EchoesWorks.forEach(myObject, function (value, prop, obj) {
                expect(Object.prototype.toString.call(obj)).toBe('[object Object]');
            });
        });
            });
    
    /**
     * Context
     */
    describe('Context changing', function () {
        var myObject;
        var myArray;
        
        beforeEach(function () {
            myArray = ['A', 'B', 'C', 'D'];
            myObject = {testA: 'A', testB: 'B', testC: 'C', testD: 'D'};
        });
        
        it('should change the context to the iterated Object', function () {
            EchoesWorks.forEach(myObject, function (value, prop, obj) {
                expect(this.testA).toEqual('A');
            }, myObject);
        });
        
        it('should change the context to the iterated Array', function () {
            EchoesWorks.forEach(myArray, function (value, index) {
                expect(this[0]).toEqual('A');
            }, myArray);
        });
    });
});
