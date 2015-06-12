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
