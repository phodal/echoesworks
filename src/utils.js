/*     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*     Underscore may be freely distributed under the MIT license.
*/

EchoesWorks.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

EchoesWorks.isFunction = function(obj) {
    return typeof obj == 'function' || false;
};

EchoesWorks.defaults = function(obj) {
    if (!EchoesWorks.isObject(obj)) {
        return obj;
    }

    for (var i = 1, length = arguments.length; i < length; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (obj[prop] === void 0) {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
};

EchoesWorks.extend = function (obj) {
    if (!EchoesWorks.isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (hasOwnProperty.call(source, prop)) {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
};

EchoesWorks.triggerEvent = function (eventName) {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    document.dispatchEvent(event);
};